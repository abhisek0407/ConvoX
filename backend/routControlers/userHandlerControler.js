import Conversation from "../Models/conversationModels.js";
import User from "../Models/userModels.js";

export const getUserBySearch = async (req, res) => {
  try {
    const search = req.query.search || "";
    const currentUserID = req.user._id;
    const user = await User.find({
      $and: [
        {
          $or: [
            { username: { $regex: ".*" + search + ".*", $options: "i" } },
            { fullname: { $regex: ".*" + search + ".*", $options: "i" } },
          ],
        },
        {
          _id: { $ne: currentUserID },
        },
      ],
    })
      .select("-password")
      .select("email");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
    console.log(error);
  }
};

// export const getCurrentChatters = async (req, res) => {
//   try {
//     const currentUserID = req.user._id;
//     const currentChatters = await Conversation.find({
//       participants: currentUserID,
//     }).sort({updateAt:-1});
//     if(!currentChatters || currentChatters.length===0) return res.status(200).send([])

//         const partcipantsIDS=currentChatters.reduce((ids,Conversation)=>{const otherParticipants=Conversation.partcipants.filter(id=>id !==currentUserID)
//             return [...ids, ...otherParticipants]
//         });
//         const otherPartcipantsIDS=participants.filter(id=>id.toString()!==currentUserID.toString());
//         const user=await User.find({_id:{$in:otherPartcipantsIDS}}).select("-password").select("-email");

//         const users=otherPartcipantsIDS.map(id=>user.find(user._id.toString()===id.toString()));
//         res.status(200).send(users)
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: error,
//     });
//     console.log(error);
//   }
// };
export const getCurrentChatters = async (req, res) => {
  try {
    const currentUserID = req.user._id;   // ✅ fixed

    const currentChatters = await Conversation.find({
      participants: currentUserID,
    }).sort({ updatedAt: -1 });

    if (!currentChatters || currentChatters.length === 0)
      return res.status(200).send([]);

    const otherParticipantsIDs = currentChatters.reduce((ids, conversation) => {
      const others = conversation.participants.filter(
        (id) => id.toString() !== currentUserID.toString()
      );
      return [...ids, ...others];
    }, []);

    const users = await User.find({ _id: { $in: otherParticipantsIDs } })
      .select("-password")
      .select("-email");

    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};