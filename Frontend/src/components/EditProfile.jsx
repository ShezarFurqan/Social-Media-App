import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { SnapContext } from '../context/SnapContext';
import axios from 'axios';
import { backendUrl } from '../../../../Enchantique jewelio/admin/src/App';
import { assets } from '../assets/assets';

const EditProfile = ({ id, setVisible, isTrue}) => {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [banner, setBanner] = useState(null);
    const { currentUser } = useContext(SnapContext);



    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formdata = new FormData();

            if (username) formdata.append("username", username);
            if (bio) formdata.append("bio", bio);
            if (profilePic) formdata.append("profilepic", profilePic);
            if (banner) formdata.append("banner", banner);

            const response = await axios.put(`${backendUrl}/api/users/edit/${id}`, formdata);
            toast.success("Profile updated successfully");
            isTrue(true);
            setVisible(false)
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };

    return (
        <div className='absolute border border-black rounded-xl w-[1200px] h-[725px] top-[10%] right-[15%] bg-white p-6 overflow-y-auto z-50'>
            <h2 className='text-2xl font-bold mb-6'>Edit Profile</h2>

            <form onSubmit={onSubmitHandler} className='space-y-5'>

                {/* Username */}
                <div>
                    <label className='block font-medium mb-1'>Username</label>
                    <input
                        type='text'
                        className='w-full border px-3 py-2 rounded-md'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Bio */}
                <div>
                    <label className='block font-medium mb-1'>Bio</label>
                    <textarea
                        className='w-full border px-3 py-2 rounded-md'
                        rows='3'
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>

                <div>
                    <label className='block font-medium mb-2'>Profile Picture</label>
                    <div className='w-24 h-24 relative rounded-full overflow-hidden border'>
                        <label className='w-full h-full flex items-center justify-center bg-gray-100 text-sm cursor-pointer'>
                            <img src={profilePic ? URL.createObjectURL(profilePic) : assets.upload_area} alt='Profile' className='w-full h-full object-cover' />

                            <input
                                type='file'
                                accept='image/*'
                                className='hidden'
                                onChange={(e)=>{setProfilePic(e.target.files[0])}}
                            />
                        </label>

                    </div>
                </div>

                {/* Banner */}
                <div>
                    <label className='block font-medium mb-2'>Banner</label>
                    <div className='w-full h-32 relative rounded-md overflow-hidden border'>

                        <label className='w-full h-full flex items-center justify-center bg-gray-100 text-sm cursor-pointer'>

                            <img alt='Banner' src={banner ? URL.createObjectURL(banner) : assets.upload_area} className='w-full h-full object-cover' />

                            <input
                                type='file'
                                accept='image/*'
                                className='hidden'
                                onChange={(e) => { setBanner(e.target.files[0]) }}
                            />
                        </label>

                    </div>
                </div>

                {/* Save Button */}
                <button
                    type='submit'
                    className='bg-blue-600 mr-2 text-white px-6 py-2 rounded-md hover:bg-blue-700 mt-4'
                >
                    Save
                </button>
                 <button
                    onClick={()=>{setVisible(false)}}
                    type='button'
                    className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 mt-4'
                >
                    cancel
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
