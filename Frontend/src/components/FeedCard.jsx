import React from 'react'
import { assets } from '../assets/assets'
import { FaRegComment } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { formatDistanceToNow } from 'date-fns'



const FeedCard = ({item}) => {
  return (
    <div className='bg-white border rounded-lg border-gray-300 w-[800px] px-6 py-6'>
      <div className='flex  justify-between'>
        <div className='flex items-center'>
          <div className='w-16 h-16 flex justify-center items-center rounded-full overflow-hidden bg-black'>
            <img className='w-full h-full object-cover' src={item.userData.profilepic} />
          </div>
          <div className='ml-2 mb-1'>
            <p className='text-xl font-bold'>{item.userData.username}</p>
            <p className='text-[#474858]'>{item.userData.username}</p>
          </div>
        </div>
        <h1 className='mt-4'>{formatDistanceToNow(new Date(item.postData.createdAt), { addSuffix: true })}</h1>
      </div>
      <h1 className='font-sans my-4 text-2xl'>{item.postData.content.text}</h1>
      <img className='rounded-lg' src={item.postData.content.image} alt="" />
      <div className='flex justify-between px-2 mt-2 cursor-pointer'>
        <div className='flex gap-4 text-xl'>
          <p className='flex items-center gap-1'><FaRegComment/>{item.postData.comments.length}</p>
          <p className='flex items-center gap-1'><BiSolidLike/>{item.postData.likes.length}</p>
        </div>
        <h1 className='font-sans text-2xl '>Follow</h1>
      </div>
    </div>
  )
}

export default FeedCard
