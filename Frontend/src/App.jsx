import React, { useContext, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Home from "../src/pages/Home"
import SideBar from './components/SideBar'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import Login from "./pages/Login"
import Messages from './pages/Messages'
import { SnapContext } from './context/SnapContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SmallSideBar from './components/SmallSideBar'

const App = () => {
  const location = useLocation();
  const { token, navigate } = useContext(SnapContext);

  useEffect(() => {
    if (token) {
      if (location.pathname === "/login"){
        navigate("/")
      } 
    } else {
        navigate("/login")
      }

  }, [token])


  return (
    <div className='bg-[#FBFBFB]'>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className='flex'>
        {location.pathname !== "/login" && location.pathname !== "/messages" && <SideBar />}
        {location.pathname === "/messages" && <SmallSideBar/>}


        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/createpost' element={<CreatePost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/messages' element={<Messages/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
