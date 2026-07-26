import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import MessageContainer from "./components/MessageContainer";
const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handelUserSelect = (user) => {
    setSelectedUser(user);
    setIsSidebarVisible(false);
  };
  const handelShowSidebar = () => {
    setIsSidebarVisible(true);
    setSelectedUser(null);
  };
  console.log("Home selectedUser:", selectedUser);
  return (
    <div
      className="
      w-full
      max-w-7xl
      h-[92vh]
      mx-auto
      rounded-2xl
      overflow-hidden
      border border-white/20
      bg-white/10
      backdrop-blur-xl
      shadow-2xl
      flex
    "
    >
      <div
        className={`
        ${isSidebarVisible ? "flex" : "hidden"}
        md:flex
        w-full
        md:w-[340px]
        lg:w-[360px]
        border-r
        border-white/10
      `}
      >
        <Sidebar onSelectUser={handelUserSelect} />
      </div>
      {/* <div
        className={`divider divider-horizontal px-3 md:flex
         ${isSidebarVisible ? "" : "hidden"} ${selectedUser ? "block" : "hidden"}`}
      ></div> */}
      <div
        className={`
        flex-1
        ${selectedUser ? "flex" : "hidden md:flex"}
      `}
      >
        <MessageContainer onBackUser={handelShowSidebar} />
      </div>
    </div>
  );
};

export default Home;
