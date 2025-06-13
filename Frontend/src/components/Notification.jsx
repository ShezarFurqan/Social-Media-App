import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { SnapContext } from '../context/SnapContext'
import { toast } from 'react-toastify'
import { formatDistanceToNow } from 'date-fns'

const Notification = () => {
  const { backendUrl, userId, users, notCount, setNotCount, Notifications } = useContext(SnapContext)
  const [notData, setNotData] = useState([])

  

    const markasread = async () => {
    try {
      const response = await axios.put(`${backendUrl}/api/notification/mark-read/${userId}`)
      console.log(response.data.message);
          
    } catch (error) {
      toast.error(error.message)
    }
  }


  

 

  useEffect(() => {
    if (Notifications && users) {
      const combinedData = []

      Notifications.forEach(notification => {
        users.forEach(user => {
          if (notification.senderId === user._id) {
            combinedData.push({
              notificationData: notification,
              userData: user,
            })
          }
        })
      })

      setNotData(combinedData.reverse()) // latest first   
    }
  }, [Notifications, users])

  useEffect(()=>{
    markasread()
  },[notData])

   useEffect(()=>{
    console.log(notCount);
    
  },[notCount])

 

  return (
    <div className='absolute right-0 mt-2 bg-white w-[500px] h-[600px] border border-gray-300 z-50 rounded-lg shadow-lg overflow-hidden'>
      <h2 className="text-xl font-bold px-4 py-3 border-b bg-gray-100">Notifications</h2>
      <div className="h-full overflow-y-auto">
        {notData.length > 0 ? (
          notData.map((item, index) => (
            <div key={index} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition">
              <img
                src={item.userData.profilepic || '/default-profile.png'}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm">
                  <span className="font-medium">{item.userData.username}</span>{' '}
                  followed you
                </p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(item.notificationData.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500">No notifications yet.</p>
        )}
      </div>
    </div>
  )
}

export default Notification
