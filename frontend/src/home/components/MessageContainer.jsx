import React, { useEffect, useState,useRef  } from 'react'
import userConversation from '../../Zustans/useConversation';
import { useAuth } from '../../context/AuthContext';
import { TiMessages } from "react-icons/ti";
import { IoArrowBackSharp, IoSend } from 'react-icons/io5';
import axios from 'axios';
import { useSocketContext } from '../../context/SocketContext';
import notify from '../../assets/sound/notification.mp3';
const MessageContainer = ({ onBackUser }) => {
    const { messages, selectedConversation, setMessage, setSelectedConversation } = userConversation();
    const {socket} = useSocketContext();
    const { authUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [sending , setSending] = useState(false);
    const [sendData , setSnedData] = useState("")
    const lastMessageRef = useRef();

    useEffect(()=>{
      socket?.on("newMessage",(newMessage)=>{
        const sound = new Audio(notify);
        sound.play().catch(() => {});
        setMessage([...messages,newMessage])
      })

      return ()=> socket?.off("newMessage");
    },[socket,setMessage,messages])

    useEffect(()=>{
        setTimeout(() => {
lastMessageRef?.current?.scrollIntoView({
behavior: "smooth",
block: "end",
});
}, 50);
    },[messages])

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const get = await axios.get(`/api/message/${selectedConversation?._id}`);
                const data = await get.data;
                if (data.success === false) {
                    setLoading(false);
                    console.log(data.message);
                }
                setLoading(false);
                setMessage(data);
            } catch (error) {
                setLoading(false);
                console.log(error);

            }
        }

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessage])
    console.log(messages);

    const handelMessages=(e)=>{
        setSnedData(e.target.value)
      }

    const handelSubmit=async(e)=>{
        e.preventDefault();
        setSending(true);
        try {
            const res =await axios.post(`/api/message/send/${selectedConversation?._id}`,{messages:sendData});
            const data = await res.data;
            if (data.success === false) {
                setSending(false);
                console.log(data.message);
            }
            setSending(false);
            setSnedData('')
            setMessage([...messages,data])
        } catch (error) {
            setSending(false);
            console.log(error);
        }
    }

    return (
        <div className=" w-full h-full flex flex-col bg-slate-900/40 backdrop-blur-md ">
        {selectedConversation === null ? (
          <div className=" flex flex-1 items-center justify-center px-8 ">
            <div className="
text-center
flex
flex-col
items-center
gap-4
">
             <p className="text-3xl font-bold text-white">Welcome!!👋 {authUser.username}😉</p>
              <p className="text-gray-300">Select a chat to start messaging</p>
              <TiMessages className="text-7xl text-sky-500"/>
            </div>
          </div>
        ) : (
          <>
            <div className="
flex
items-center
justify-between
px-4
h-16
border-b
border-slate-700
bg-slate-800/90
backdrop-blur
shadow-md
">
              <div className='flex gap-2 md:justify-between items-center w-full'>
                <div className='md:hidden ml-1 self-center'>
                  <button onClick={() => onBackUser(true)} className="
w-10
h-10
rounded-full
bg-slate-700
text-white
hover:bg-sky-600
transition
flex
items-center
justify-center
">
                    <IoArrowBackSharp size={25} />
                  </button>
                </div>
                <div className='flex justify-between mr-2 gap-2'>
                  <div className='self-center'>
                    <img className="
w-10
h-10
rounded-full
object-cover
border-2
border-sky-500
" src={selectedConversation?.profilepic} />
                  </div>
                  <span className="
text-white
text-lg
font-semibold
">
                    {selectedConversation?.username}
                  </span>
                </div>
              </div>
            </div>
      
           <div
className="
flex-1
overflow-y-auto
px-4
py-4
space-y-3
bg-slate-900/20
">
              {loading && (
                <div className="
flex
h-full
items-center
justify-center
">
                  <div className="loading loading-spinner"></div>
                </div>
              )}
              {!loading && messages?.length === 0 && (
               <p className="
text-center
text-gray-400
mt-10
text-lg
">Send a message to 
                start Conversation</p>
              )}
              {!loading && messages?.length > 0 && messages?.map((message) => (
                <div className='text-white' key={message?._id} ref={lastMessageRef}>
                  <div className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}>
                    <div className='chat-image avatar'></div>
                    <div
className={`
chat-bubble
shadow-md
${
message.senderId===authUser._id
?
'bg-sky-600 text-white'
:
'bg-slate-700 text-white'
}
`}
>
                      {message?.message}
                    </div>
                    <div className="
chat-footer
text-[11px]
text-gray-300
mt-1
">
                      {new Date(message?.createdAt).toLocaleDateString('en-IN')}
                      {new Date(message?.createdAt).toLocaleTimeString('en-IN', { hour: 'numeric', minute:
                         'numeric' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <form
onSubmit={handelSubmit}
className="
p-4
border-t
border-slate-700
bg-slate-800/80
backdrop-blur
">
            <div
className="
flex
items-center
rounded-full
bg-slate-700
border
border-slate-600
overflow-hidden
">
              <input value={sendData} onChange={handelMessages} required id='message' type='text' 
              className="
flex-1
bg-transparent
outline-none
px-5
py-3
text-white
placeholder:text-gray-400
"/>
              <button type='submit'>
                {sending ? <div className='loading loading-spinner'></div>:
                <IoSend
size={22}
className="
w-11
h-11
p-2
rounded-full
bg-sky-500
text-white
hover:bg-sky-600
transition
cursor-pointer
mx-1
"/>
                }
              </button>
            </div>
            </form>
          </>
        )}
      </div>
    )
}

export default MessageContainer