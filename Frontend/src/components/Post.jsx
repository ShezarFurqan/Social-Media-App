import React, { useState, useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { RxCross2 } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { SnapContext } from '../context/SnapContext';
import CommentComponent from './Comment';
import { toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns'


const Post = ({ postData, userData }) => {

    const { visible, setVisible, backendUrl, currentUser, userId, setUpdatePost, token } = useContext(SnapContext)
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [likes, setLikes] = useState(128);
    const [isLike, setIsLike] = useState([])
    const postTime = "2 hours ago";

    useEffect(() => {

        const kuchbhi = postData.likes.filter(item => item === userId)

        if (kuchbhi) {
            setIsLike(kuchbhi);            
        }

    }, [postData])
    
    

    const Like = async () => {
        try {

            const response = await axios.put(
                `${backendUrl}/api/post/${postData._id}/like`,
                {}, // no body data
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            setUpdatePost(true)
            toast.success(response.data.message);


        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleAddComment = async () => {
        try {
            if (newComment.trim().length < 3) {
                toast.error("Comment length should be above 3");
                return;
            }

            const formdata = {
                comment: newComment,
                username: currentUser.username,
                profilepic: currentUser.profilepic
            }

            const response = await axios.post(
                `${backendUrl}/api/post/${postData._id}/comment`,
                formdata,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setUpdatePost(true)




            if (response.data.success) {
                toast.success(response.data.message);
                setNewComment("");
            }

        } catch (error) {
            toast.error(error.message);
        }
    };



    useEffect(() => {
        setComments(postData.comments)
        setLikes(postData.likes)

    }, [postData])




    if (!postData || !userData || !currentUser) return null;
    return (
        <div className='absolute border top-[5%] left-[10%] bg-white w-10/12 h-11/12 z-50'>
            <div className='w-full h-full flex'>
                {/* Left Image Section */}
                <div className='w-2/3 h-full'>
                    <img className='w-full h-full object-cover' src={postData.content.image} alt="Post" />
                </div>

                {/* Right Info Section */}
                <div className='p-4 w-1/3 flex flex-col'>
                    {/* Top User Info */}
                    <div className='w-full'>
                        <div className='flex items-center'>
                            <div className='w-10 h-10 flex justify-center items-center rounded-full overflow-hidden bg-black'>
                                <img className='w-full h-full object-cover' src={userData[0]} alt="Profile" />
                            </div>
                            <div className='ml-2 mb-1'>
                                <p className='text-md font-bold'>{userData[1]}</p>
                            </div>
                        </div>
                        <RxCross2 onClick={() => { setVisible(!visible) }} className='absolute right-5 text-2xl top-7 cursor-pointer' />
                    </div>

                    {/* Post Title */}
                    <div className='mt-8'>
                        <div className='flex items-center'>
                            <div className='w-11 h-11 flex justify-center items-center rounded-full overflow-hidden bg-black'>
                                <img className='w-full h-full object-cover' src={userData[0]} alt="Profile" />
                            </div>
                            <div className='ml-2 mb-1'>
                                <p className='text-md font-semibold'>
                                    {userData[1]} <span className='font-normal ml-1'>{postData.content.text}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Comments */}
                    <div className='mt-6 flex flex-col gap-4 overflow-y-auto pr-2 flex-grow'>
                        {comments.map((item, index) => (
                            <CommentComponent key={index} item={item} id={postData._id} createdBy={postData.postedBy} />
                        ))}
                    </div>

                    {/* Bottom Fixed Actions */}
                    <div className='mt-4'>
                        {/* Like and Comment Count */}
                        <div className='text-2xl flex gap-3 items-center'>
                           {isLike?.length > 0 ? <FaHeart className='text-[#FF3140]' onClick={Like}/> :<FaRegHeart onClick={Like} className='cursor-pointer' />}
                            <span className='text-sm font-medium'>{likes.length} likes</span>
                            <FaRegCommentAlt className='ml-4' />
                            <span className='text-sm font-medium ml-1'>{comments.length} comments</span>
                            <span className='ml-auto text-xs text-gray-500'>{formatDistanceToNow(new Date(postData.createdAt), { addSuffix: true })}</span>
                        </div>

                        {/* Comment Input */}
                        <div className='mt-3 flex items-center gap-2'>
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className='border w-full px-3 py-1 rounded-md text-sm outline-none'
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                            />
                            <button
                                onClick={handleAddComment}
                                className='px-3 py-1 bg-black text-white rounded-md text-sm'
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
