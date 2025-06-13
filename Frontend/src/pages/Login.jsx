// src/pages/Login.jsx
import React, { useContext, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { SnapContext } from "../context/SnapContext"
import { toast } from "react-toastify"
import axios from "axios"


const Login = () => {

  const { backendUrl, setToken, token, navigate} = useContext(SnapContext)
  const [login, setLogin] = useState(true)
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (form.email && form.password) {
        if (!login) {
          const response = await axios.post(backendUrl + "/api/auth/register", form);
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            toast.success("Register Success")
          }
        } else {
          const response = await axios.post(backendUrl + "/api/auth/login", form);
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            toast.success("login Success")
          }
        }
      }


    } catch (error) {
      toast.error(error)
    }
  }




  return (
    <div className='flex justify-center items-center w-full'>
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/your-background-image.jpg')` }}>
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-10 w-[400px] max-w-full">
          <h2 className="text-3xl font-bold text-[#0E1729] text-center mb-6">WebWeavers</h2>
          <h2 className="text-3xl font-bold text-[#0E1729] text-center mb-6">Login</h2>
          <form className="space-y-4" onSubmit={onSubmitHandler}>
            {login ? "" : <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              value={form.username}
              onChange={onChangeHandler}
              name='username'
            />}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              value={form.email}
              onChange={onChangeHandler}
              name='email'
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              value={form.password}
              onChange={onChangeHandler}
              name='password'
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
            >
              {login ? "Login" : "Register"}
            </button>
          </form>

          <div className="my-4 text-center text-gray-500">or</div>

          <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition">
            <FcGoogle size={22} />
            Sign in with Google
          </button>

          <p className="text-center text-sm text-gray-700 mt-4">
            {login ? "Don't have an account? " : "Already have an account? "}<button onClick={() => { setLogin(!login) }} className="text-black font-medium hover:underline">{login ? "Register" : "Login"}</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
