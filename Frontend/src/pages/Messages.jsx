import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { SnapContext } from '../context/SnapContext';
import { formatDistanceToNow } from 'date-fns'


const Messages = () => {

  const { backendUrl, userId, socket, onlineUsers, navigate, currentUser } = useContext(SnapContext)
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [selectedUser, setSelectedUser] = useState("")
  const [unseenMessages, setunseenMessages] = useState(null)
  const [text, setText] = useState("")
  const [isTrue, setIsTrue] = useState(false)



  const getUserChats = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/messages/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setUsers(response.data.users)
        setunseenMessages(response.data.unseenMessages)
      }

      if (response.data.users?.length > 0) {
        setSelectedUser(response.data.users[0]);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getMessages = async () => {
    if (!selectedUser?._id) return;
    try {


      const response = await axios.get(backendUrl + `/api/messages/${selectedUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

      if (response.data.success) {
        setMessages(response.data.messages);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  const sendMessage = async () => {
    try {

      if (text.length > 0) {
        const { data } = await axios.post(backendUrl + `/api/messages/send/${selectedUser._id}`, { text },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })

        if (data.success) {
          setMessages((prevMessages) => [...prevMessages, data.newMessage])
          setIsTrue(true)
          setText("")
        } else {
          toast.error(data.message)
        }

      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const subscribeToMessages = async () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        axios.put(backendUrl + `/api/messages/mark/${newMessage._id}`);
      } else {
        setunseenMessages((prevUnseenMessages) => ({
          ...prevUnseenMessages, [newMessage.senderId]:
            prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages
            [newMessage.senderId] + 1 : 1
        }))
      }
    })
  }


  const unSubscribeFromMessages = () => {
    if (socket) socket.off("newMessage");
  }

  useEffect(() => {
    subscribeToMessages();
    return () => unSubscribeFromMessages();
  }, [socket, selectedUser])

  useEffect(() => {
    getUserChats();
  }, [onlineUsers])

  useEffect(() => {
    getMessages()
  }, [selectedUser])

  useEffect(() => {
    console.log(messages);

  }, [messages])

  return users && (
    <div className="h-screen w-full flex">
      {/* Sidebar */}
      <div className="w-1/4 border-r border-gray-300 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <div className="space-y-4">
          {users.map((user, i) => (
            <div
              key={i}
              onClick={() => setSelectedUser(user)}
              className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded cursor-pointer relative"
            >
              <div className="relative">
                <img
                  className="w-16 h-16 rounded-full bg-gray-300 object-cover"
                  src={user.profilepic}
                />
                {unseenMessages[user._id] > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unseenMessages[user._id]}
                  </span>
                )}
              </div>
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-gray-500">
                  {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div onClick={() => { navigate("/profile/" + selectedUser._id) }} className="p-4 border-b border-gray-300 flex items-center space-x-3 cursor-pointer">
          <img src={selectedUser?.profilepic} className="w-10 h-10 rounded-full bg-gray-300" />
          <div>
            <p className="font-semibold ">{selectedUser?.username}</p>
            {
              onlineUsers?.includes(selectedUser._id)
                ? <p className="text-sm text-gray-500">Online</p>
                : <p className="text-sm text-gray-500">Offline</p>
            }
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
          {messages.map((msg, index) => {
            const isCurrentUser = msg.senderId === userId;
            const profilePic = isCurrentUser ? currentUser?.profilepic : selectedUser?.profilepic;
  

            return (
              <div
                key={index}
                className={`flex w-full ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[75%]`}>
                  {/* Profile Pic */}
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-9 h-9 object-cover rounded-full"
                  />

                  {/* Message + Time */}
                  <div className="flex flex-col">
                    <div
                      className={`px-4 py-2 rounded-xl text-sm shadow-sm break-words ${isCurrentUser
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-gray-200 text-black rounded-bl-none'
                        }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-500 mt-1 self-end pr-1">
                      {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>




        {/* Input */}
        <div className="p-4 border-t border-gray-300">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={text}
              onChange={(e) => { setText(e.target.value) }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full outline-none"
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-full">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages
