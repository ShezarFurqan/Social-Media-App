import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { assets } from '../assets/assets';
import ProfileTabs from '../components/ProfileTabs';
import Button from '../components/Button'
import { toast } from 'react-toastify';
import { SnapContext } from '../context/SnapContext';
import axios from 'axios';
import { useParams } from 'react-router';
import EditProfile from '../components/EditProfile';



const Profile = () => {

  const [postData, setPostData] = useState("")
  const [visible, setVisible] = useState(false)
  const [isTrue, setIsTrue] = useState(false)
  const { id } = useParams()
  const { backendUrl, posts, currentUser, setCurrentUser, getProfile, userData } = useContext(SnapContext)

  useEffect(() => {
    if (id) {
      getProfile(id)
      setIsTrue(false)
    }
  }, [id,isTrue])

  


  useEffect(() => {
    if (posts.length && id) {
      const userPost = posts.filter(item => item.postedBy === id);
      setPostData(userPost);
      
    }
  }, [posts, id]);


 


  const followUser = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${backendUrl}/api/users/${id}/follow`,
        {}, // body not needed
        {
          headers: {
            Authorization: `Bearer ${token}`, // VERY IMPORTANT!
          },
        }
      );

      setCurrentUser((prevUser) => ({
        ...prevUser,
        following: [...prevUser.following, id],
      }));

      setIsTrue(true)


      if (response.data.success) {
        toast.success(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const unFollowUser = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${backendUrl}/api/users/${id}/unfollow`,
        {}, // body not needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCurrentUser((prevUser) => ({
        ...prevUser,
        following: prevUser.following.filter((userId) => userId !== id),
      }));

      setIsTrue(true)

      if (response.data.success) {
        toast.success(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const whatInFollowButton = () => {
    if (
      currentUser &&
      Array.isArray(currentUser.followers) &&
      Array.isArray(currentUser.following)
    ) {
      const isFollowing = currentUser.following.includes(id);
      const isFollowedBy = currentUser.followers.includes(id);

      if (isFollowedBy && !isFollowing) {
        return (
          <div onClick={followUser} className='w-fit h-fit'>
            <Button text={"Follow Back"} />
          </div>
        );
      } else if (isFollowing) {
        return (
          <div onClick={unFollowUser} className='w-fit h-fit'>
            <Button text={"Unfollow"} />
          </div>
        );
      } else {
        return (
          <div onClick={followUser} className='w-fit h-fit'>
            <Button text={"Follow"} />
          </div>
        );
      }
    }

    return null;
  };





  return (
    <div className="w-full ml-16 ">
      <div className='pl-8'>
        <NavBar />
      </div>

      <div className='px-8 pr-[60px]'>
        {/* Banner & Profile */}
        <div className="relative">
          {/* Banner */}
          <div
            className="w-full h-[250px] bg-cover bg-center rounded-t-2xl"
            style={{ backgroundImage: `url(${userData && userData.banner})` }}
          ></div>

          {/* Profile Info */}
          <div className="absolute left-[3%] text-[#131312] -bottom-56">

            <label htmlFor="profilePic" className="block cursor-pointer">
              <div className="w-52 h-52 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <img
                  src={userData?.profilepic}
                  alt="User Profile"
                  className="w-full h-full object-cover object-center"
                />
              </div>

            </label>
            <h1 className="font-bold text-3xl mt-4 mr-4">{userData?.username}</h1>
            <p className="my-2 text-lg">@{userData?.username}</p>
            <h1 className="my-2 text-xl font-sans">
              {userData?.bio}
            </h1>
            <div className="flex gap-6 text-xl font-sans my-2">
              <h1>
                <span className="font-semibold">{userData?.followers?.length || 0}</span> Followers
              </h1>
              <h1>
                <span className="font-semibold">{userData?.following?.length || 0}</span> Following
              </h1>
            </div>
          </div>

          {/* Edit Profile Button */}
          {currentUser._id === id ? (
            <div onClick={() => setVisible(!visible)} className='w-fit h-fit'>
              <Button text="Edit Profile" />
            </div>
          ) : whatInFollowButton()}

          {visible ? <EditProfile setVisible={setVisible} isTrue={setIsTrue} id={id} /> : ""}
        </div>

        {/* Spacer to allow absolute content to flow */}
        <div className="h-64" /> {/* Push content below profile section */}

        {/* Profile Tabs Section */}
        <ProfileTabs postData={postData} userData={[userData.profilepic, userData.username]} />
      </div>
    </div>
  );
};

export default Profile;
