import React from 'react'
import { assets } from '../assets/assets'
import { FaHeart } from "react-icons/fa";
import { MdModeComment } from "react-icons/md";

const PostCard = ({item}) => {
    return (
        <div className="relative w-80 h-80 group overflow-hidden">
            <img
                className="w-full h-full object-cover"
                src={item.content.image}
                alt=""
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-6 text-white text-lg font-semibold">
                    {/* Likes */}
                    <div className="flex items-center gap-2">
                        <FaHeart />
                        <span>{item.likes && item.likes.length}</span>
                    </div>

                    {/* Comments */}
                    <div className="flex items-center gap-2">
                       <MdModeComment/>
                        <span>{item.comments && item.comments.length}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PostCard
