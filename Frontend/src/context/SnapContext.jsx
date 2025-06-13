import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import axios from "axios"


export const SnapContext = createContext()

const SnapContextProvider = (props) => {

  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [userId, setUserId] = useState("")
  const [posts, setPosts] = useState("")
  const [currentUser, setCurrentUser] = useState("")
  const [visible, setVisible] = useState(false)
  const [userData, setUserData] = useState("")
  const [updatePost, setUpdatePost] = useState(false)
  const [users, setUsers] = useState([])
  const [notCount, setNotCount] = useState("")
  const [Notifications, setNotifications] = useState([])
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])


  const connectSocket = () => {
    if (!currentUser || socket?.connected) return;
    
    
    const newSocket = io(backendUrl, {
      query: {
        userId: currentUser._id,
      }
    })
    setSocket(newSocket)

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    })
  }




  const getProfile = async (id) => {
    try {

      const response = await axios.get(backendUrl + `/api/users/${id}`)

      setUserData(response.data.user)




    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
        setToken(null);
        setUserId("");
        navigate("/login");
      }
    } else {
      setUserId("");
    }
  }, [token]);

  const getAllPosts = async () => {
    try {

      const response = await axios.get(backendUrl + `/api/post/getposts`)

      setPosts(response.data.posts);





    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getAllPosts()
    setUpdatePost(false)

  }, [updatePost])

  useEffect(() => {
    connectSocket();
  }, [currentUser]);


  const getCurrentProfile = async () => {
    try {

      const response = await axios.get(backendUrl + `/api/users/${userId}`)

      setCurrentUser(response.data.user);


    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (userId) {
      getCurrentProfile()
    }
  }, [userId])


  const getAllUsers = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/users/getallusers')
      setUsers(response.data.users)


    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])


  const getNotification = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/notification/${userId}`)
      setNotifications(response.data.notifications)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (userId) getNotification()
  }, [userId])

  useEffect(() => {
    if (Notifications) {
      setNotCount(Notifications.filter(item => item.isRead === false))
    }

  }, [Notifications])


  const value = {
    navigate,
    backendUrl,
    token,
    setToken,
    setUserId,
    userId,
    posts,
    currentUser,
    setCurrentUser,
    visible,
    setVisible,
    getProfile,
    userData,
    getAllPosts,
    setUpdatePost,
    updatePost,
    users,
    setNotCount,
    notCount,
    Notifications,
    socket,
    onlineUsers
  }

  return (
    <SnapContext.Provider value={value}>
      {props.children}
    </SnapContext.Provider>
  )
}

export default SnapContextProvider