import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import userConversation from "../../Zustans/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Sidebar = ({ onSelectUser }) => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [searchUser, setSearchuser] = useState([]);
  const [chatUser, setChatUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSetSelectedUserId] = useState(null);
  const [newMessageUsers, setNewMessageUsers] = useState({});
  const {
    messages,
    setMessage,
    selectedConversation,
    setSelectedConversation,
  } = userConversation();
  const { onlineUser, socket } = useSocketContext();

  const nowOnline = chatUser.map((user) => user._id);
  //chats function
  const isOnline = nowOnline.map((userId) => onlineUser.includes(userId));

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setNewMessageUsers(newMessage);
    });
    return () => socket?.off("newMessage");
  }, [socket, messages]);

  //show user with u chatted
  useEffect(() => {
    const chatUserHandler = async () => {
      setLoading(true);
      try {
        const chatters = await axios.get(`/api/user/currentchatters`);
        const data = chatters.data;
        if (data.success === false) {
          setLoading(false);
          console.log(data.message);
        }
        setLoading(false);
        setChatUser(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    chatUserHandler();
  }, []);

  //show user from the search result
  const handelSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const search = await axios.get(`/api/user/search?search=${searchInput}`);
      const data = search.data;
      if (data.success === false) {
        setLoading(false);
        console.log(data.message);
      }
      setLoading(false);
      if (data.length === 0) {
        toast.info("User Not Found");
      } else {
        setSearchuser(data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //show which user is selected
  const handelUserClick = (user) => {
    onSelectUser(user);
    setSelectedConversation(user);
    setSetSelectedUserId(user._id);
    setNewMessageUsers("");
  };

  //back from search result
  const handSearchback = () => {
    setSearchuser([]);
    setSearchInput("");
  };

  //logout
  const handelLogOut = async () => {
    const confirmlogout = window.prompt("type 'UserName' To LOGOUT");
    if (confirmlogout === authUser.username) {
      setLoading(true);
      try {
        const logout = await axios.post("/api/auth/logout");
        const data = logout.data;
        if (data?.success === false) {
          setLoading(false);
          console.log(data?.message);
        }
        toast.info(data?.message);
        localStorage.removeItem("chatapp");
        setAuthUser(null);
        setLoading(false);
        navigate("/login");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      toast.info("LogOut Cancelled");
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-slate-900/40 backdrop-blur-md px-3 py-3">
      <div className="flex items-center gap-3">
        <form
          onSubmit={handelSearchSubmit}
          className="
flex-1
flex
items-center
bg-slate-800
border
border-slate-700
rounded-full
overflow-hidden
shadow-md
"
        >
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            className="
            flex-1
            px-4
            py-3
            bg-transparent
            outline-none
            text-white
            placeholder:text-gray-400
            "
            placeholder="search user"
          />
          <button className=" w-11 h-11 flex items-center justify-center bg-sky-500 hover:bg-sky-600 transition ">
            <FaSearch />
          </button>
        </form>
        <img
          onClick={() => navigate(`/profile/${authUser?._id}`)}
          src={authUser?.profilepic}
          className=" h-12 w-12 rounded-full object-cover border-2 border-sky-500 cursor-pointer hover:scale-105 transition "
        />
      </div>
      <div className="border-b border-slate-700 my-4"></div>
      {searchUser?.length > 0 ? (
        <>
          <div className=" flex-1 overflow-y-auto pr-1 space-y-2 ">
            <div className="w-auto">
              {searchUser.map((user, index) => (
                <div key={user._id}>
                  <div
                    onClick={() => handelUserClick(user)}
                   className={` flex items-center gap-3 rounded-xl px-3 py-2 cursor-pointer transition-all duration-300 ${ selectedUserId===user._id ?"bg-sky-600 shadow-lg" :"hover:bg-slate-800" } `}
                  >
                    {/*Socket is Online*/}
                    <div
                      className={`avatar ${isOnline[index] ? "online" : ""}`}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-600">
                        <img src={user.profilepic} alt="user.img" />
                      </div>
                    </div>
                    <div className="flex flex-col flex-1">
                      <p className="font-semibold text-white">{user.username}</p>
                    </div>
                  </div>
                  <div className="divider divide-solid px-3 h-[1px]"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto px-1 py-1 flex">
            <button
              onClick={handSearchback}
              className=" w-10 h-10 rounded-full bg-slate-800 text-white hover:bg-sky-600 transition "
            >
              <IoArrowBackSharp size={25} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="min-h-[70%] max-h-[80%] m overflow-y-auto scrollbar ">
            <div className="w-auto">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <span className="loading loading-spinner loading-lg text-sky-500"></span>
                </div>
              ) : chatUser.length === 0 ? (
                <>
                  <div className="font-bold items-center flex flex-col text-xl text-yellow-500">
                    <h1>Why are you Alone!!🤔</h1>
                    <h1>Search username to chat</h1>
                  </div>
                </>
              ) : (
                <>
                  {chatUser.map((user, index) => (
                    <div key={user._id}>
                      <div
                        onClick={() => handelUserClick(user)}
                        className={`flex gap-3 
                                                items-center rounded 
                                                p-2 py-1 cursor-pointer
                                                ${
                                                  selectedUserId === user?._id
                                                    ? "bg-sky-500"
                                                    : ""
                                                } `}
                      >
                        {/*Socket is Online*/}
                        <div
                          className={`avatar ${isOnline[index] ? "online" : ""}`}
                        >
                          <div className="w-12 rounded-full">
                            <img src={user.profilepic} alt="user.img" />
                          </div>
                        </div>
                        <div className="flex flex-col flex-1">
                          <p className="font-bold text-gray-950">
                            {user.username}
                          </p>
                        </div>
                        <div>
                          {newMessageUsers.reciverId === authUser._id &&
                          newMessageUsers.senderId === user._id ? (
                            <div className=" w-6 h-6 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-bold ">
                              +1
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="divider divide-solid px-3 h-[1px]"></div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-3">
            <button
              onClick={handelLogOut}
              className="
w-10
h-10
rounded-lg
flex
items-center
justify-center
bg-slate-800
text-white
hover:bg-red-600
transition
"
            >
              <BiLogOut className="text-white" size={24} />
            </button>
            <p className="text-gray-300 font-medium">Logout</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
