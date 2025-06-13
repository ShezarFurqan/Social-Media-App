import React, { useContext, useState } from 'react';
import NavBar from '../components/NavBar';
import { toast } from 'react-toastify';
import axios from 'axios';
import { SnapContext } from '../context/SnapContext';

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');

  const { backendUrl,token } = useContext(SnapContext)

 


  const onSubmitHandler = async (e) => {
    try {

      e.preventDefault()

      const formdata = new FormData()

      title && formdata.append('text', title)
      image && formdata.append('image', image)

      const response = await axios.post(backendUrl + `/api/post/createpost`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      toast.success(response.data.message)

      console.log(response);



    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='w-full min-h-screen pr-[15px] pl-[69px] bg-[#fafafa]'>
      <NavBar />

      <div className='flex justify-center mt-20'>
        <h1 className='text-5xl text-[#131312] font-semibold'>Create New Post</h1>
      </div>

      <form onSubmit={onSubmitHandler} className='max-w-3xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg'>
        {/* Post Title */}
        <input
          required
          type='text'
          placeholder='Enter post title...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-3 mb-6 text-lg outline-none focus:ring-2 focus:ring-black'
        />

        {/* Image Upload */}
        <div className='mb-6'>
          <label className='block text-lg font-medium mb-2'>Upload Image</label>
          <div className='border border-dashed border-gray-400 rounded-md p-6 flex items-center justify-center cursor-pointer hover:border-black transition'>
            <input
              required
              type='file'
              accept='image/*'
              onChange={(e)=>{setImage(e.target.files[0])}}
              className='hidden'
              id='upload'
            />
            <label htmlFor='upload' className='text-gray-500 cursor-pointer'>
              Click to upload image
            </label>
          </div>

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt='Preview'
              className='mt-4 rounded-md max-h-80 object-cover w-full'
            />
          )}
        </div>

        {/* Post Button */}
        <div className='flex justify-end'>
          <button
            type='submit'
            className='border border-gray-500 px-6 p-2 rounded-md hover:bg-[#151616] hover:text-white transition-normal'
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
