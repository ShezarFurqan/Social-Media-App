import React, { useContext, useEffect, useState } from 'react'
import UserCard from './UserCard'
import { SnapContext } from '../context/SnapContext'
import { toast } from "react-toastify"
import axios from 'axios'

const RightSideBar = () => {

    const [userData, setUserData] = useState("")
    const [Users, setUsers] = useState([])

    const { backendUrl, userId, users } = useContext(SnapContext)

    const getProfile = async () => {
        try {

            const response = await axios.get(backendUrl + `/api/users/${userId}`)

            setUserData(response.data.user);


        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (userId) {
            getProfile()
        }
    }, [userId])

    useEffect(() => {
        setUsers(users.sort((a, b) => b.followers - a.followers).filter(item => item._id !== userId).slice(0, 3))
    }, [users])

    return (
        <div className='w-full ml-16 mr-16 h-fit border p-4 border-gray-300 rounded-lg'>
            {userData && <UserCard id={userData._id} label={"Switch"} username={userData.username} profilepic={userData.profilepic} />}
            <hr className='w-full mt-6 border-gray-200' />
            <div className='mt-6'>
                <h1 className='text-3xl font-semibold text-[#161616]'>Trending Topics</h1>
                <div className='grid grid-cols-2 text-2xl font-sans text-[#161616] p-4 mt-2 gap-4 mr-12'>
                    <h1 className='h-fit  border p-1 px-2 rounded-md border-gray-300'>#Productivity</h1>
                    <h1 className='h-fit  border p-1 px-2 rounded-md border-gray-300'>#design</h1>
                    <h1 className='h-fit  border p-1 px-2 rounded-md border-gray-300'>#technology</h1>
                    <h1 className='h-fit  border p-1 px-2 rounded-md border-gray-300'>#marketing</h1>
                    <h1 className='h-fit  border p-1 px-2 rounded-md border-gray-300'>#business</h1>
                </div>
            </div>
            <div className='mt-6'>
                <h1 className='text-3xl font-semibold text-[#161616]'>Suggestions for you</h1>
                {Users.map((item, index) => (
                    <div key={index} className='border border-gray-200 rounded-md p-2 mt-4'>
                        <UserCard id={item._id} username={item.username} profilepic={item.profilepic}  label={"Follow"} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RightSideBar
