import React, { useContext, useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import { SnapContext } from '../context/SnapContext'
import Post from '../components/Post'
import EditProfile from '../components/EditProfile'

const Explore = () => {

    const [currentData, setCurrentData] = useState("")
    const { posts, visible, setVisible, getProfile, userData } = useContext(SnapContext)

    useEffect(() => {

        if (currentData.postedBy) {
            getProfile(currentData.postedBy)
        }

    }, [currentData])

    useEffect(() => {

        if (currentData) {

            const updated = posts.find(item => item._id === currentData._id);
            if (updated && JSON.stringify(updated) !== JSON.stringify(currentData)) {
                setCurrentData(updated);
            }
        }


    }, [posts]);

    return posts && (
        <div className='w-full flex justify-center mt-12'>
            <div className="grid grid-cols-3 gap-1">
                {posts.map((item, index) => (
                    <div onClick={() => {
                        setVisible(true);
                        setCurrentData(item)
                    }

                    } key={index}>
                        <PostCard item={item} />
                    </div>
                ))}
            </div>

            {visible && currentData && userData && (
                <Post postData={currentData} userData={[userData.profilepic, userData.username]} />
            )}

        </div>
    )
}

export default Explore
