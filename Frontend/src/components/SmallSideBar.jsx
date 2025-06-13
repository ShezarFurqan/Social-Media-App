import React, { useContext, useEffect } from 'react'
import { NavLink, useLocation, Link } from 'react-router'
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { BiMessageSquare } from "react-icons/bi";
import { BiSolidMessageSquare } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { IoCreateSharp } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { SnapContext } from '../context/SnapContext';


const SmallSideBar = () => {
  const location = useLocation();
  const { userId, token, setToken, navigate } = useContext(SnapContext)


  return (
    <div className='w-[5%] h-[100vh] p-4 py-6 px-8 border-r border-[#cccccc] sticky top-0'>
      <h1 className='text-5xl text-[#151616]  font-bold'>S</h1>
      <div className='mt-12 flex flex-col gap-3'>
        <Link className="flex items-center text-3xl py-6 gap-4" to={"/"}>{location.pathname == '/' ? <GoHomeFill/> : <GoHome/>}</Link>
        <Link className="flex items-center text-3xl py-6 gap-4" to={"/explore"}>{location.pathname == '/explore' ? <FaSearch /> : <IoSearchOutline/>}</Link>
        <Link className="flex items-center text-3xl py-6 gap-4" to={`/profile/${userId}`}>{location.pathname == '/profile' ? <FaUser/> : <FaRegUser/>}</Link>
        <Link className="flex items-center text-3xl py-6 gap-4" to={"/createpost"}>{location.pathname == '/createpost' ? <IoCreateSharp/> : <IoCreateOutline />}</Link>
        <Link className="flex items-center text-3xl py-6 gap-4" to={"/messages"}>{location.pathname == '/messages' ? <BiSolidMessageSquare/> : <BiMessageSquare />}</Link>
        <Link className="flex items-center text-3xl py-6 gap-4 mt-52" onClick={()=>{setToken("");localStorage.removeItem('token')}} ><IoLogOutOutline /></Link>
      </div>
    </div>
  )
}

export default SmallSideBar
