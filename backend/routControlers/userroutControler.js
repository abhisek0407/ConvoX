import User from "../Models/userModels.js";
import bcrypt from "bcryptjs";
import jwtToken from "../utils/jwtwebToken.js";
export const userRegister = async (req, res) => {
  try {
    const { fullname, username, email, gender, password, profilePic } =
      req.body;
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (user)
      return res
        .status(500)
        .send({ success: false, message: "Username or Email Already Exist" });
    const hashPassword = bcrypt.hashSync(password, 10);
    // const profileBoy =
    //   profilePic ||
    //   `https://avatar.iran.liara.run/public/boy?username=${username}`;
    // const profileGirl =
    //   profilePic ||
    //   `https://avatar.iran.liara.run/public/girl?username=${username}`;
    let avatar;

    if (gender === "male") {
      avatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(username)}`;
    } else {
      avatar = `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(username)}`;
    }
    
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashPassword,
      gender,
      profilePic: avatar,
    });
    if (newUser) {
      await newUser.save();
      jwtToken(newUser._id, res);
    } else {
      res.status(500).send({ success: false, message: "Invalid user data" });
    }
    res.status(201).send({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      profilePic: newUser.profilePic,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
    console.log(error);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(500).send({
        success: false,
        message: "Email doesn't exist. Please register.",
      });
    const comparePass = bcrypt.compareSync(password, user.password || "");

    if (!comparePass)
      return res.status(500).send({
        success: false,
        message: "Email or password doesn't match.",
      });
    jwtToken(user._id, res);
    res.status(200).send({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
      email: user.email,
      message: "Successfullyy login",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
    console.log(error);
  }
};

export const userLogout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).send({ message: "User LogOut" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
    console.log(error);
  }
};
