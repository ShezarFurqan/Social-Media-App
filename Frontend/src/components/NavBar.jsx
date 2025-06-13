import React, { useContext, useState } from 'react'
import SearchBar from './SearchBar'
import { FaRegBell } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { SnapContext } from '../context/SnapContext';
import Notification from './Notification';

const NavBar = () => {

    const [showDropDown, setshowDropDown] = useState(false)
    const [visible, setVisible] = useState(false)

    const { navigatem, notCount } = useContext(SnapContext)

    return (
        <div className="flex h-fit w-full justify-between py-7 gap-6">
            <SearchBar />
            <div className="flex gap-8 text-4xl items-center mr-16">
                <div className='relative'>
                    <FaRegBell
                        onClick={() => setVisible(!visible)}
                        className="cursor-pointer"
                    />

                    {notCount.length > 0 && (
                        <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {notCount.length > 9 ? '9+' : notCount.length}
                        </div>
                    )}

                    {visible && <Notification />}
                </div>
                <div className='group relative'>
                    <FaUser onClick={() => { navigate('/login') }} />
                    {/* Dropdown Menu */}

                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded text-sm'>
                            <p className='cursor-pointer hover:text-black'>Orders</p>
                            <p className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>
                </div>
                <CiSettings className='text-5xl ' />
            </div>
        </div>

    )
}

export default NavBar
