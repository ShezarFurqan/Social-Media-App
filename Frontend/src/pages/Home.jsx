import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import FeedCard from '../components/FeedCard'
import RightSideBar from '../components/RightSideBar'
import { SnapContext } from '../context/SnapContext'

const Home = () => {

  const { posts, users } = useContext(SnapContext)
  const [feedData, setFeedData] = useState([])


  useEffect(()=>{

    if(posts && users){  

      const feed = []

      posts.forEach(post => {
        users.forEach(user => {
          if(post.postedBy === user._id){
            feed.push({userData: user, postData: post})
          }
        });
      });

      setFeedData(feed);
    }
    

  },[posts,users])



  return feedData && (
    <div className='w-full ml-20'>
      <NavBar />
      <div className='flex'>
        <div className='flex flex-col gap-4'>
         {feedData.map((item,index)=>(
          <FeedCard key={index} item={item} />
         ))}
          
        </div>
        <RightSideBar />
      </div>
    </div>
  )
}

export default Home
