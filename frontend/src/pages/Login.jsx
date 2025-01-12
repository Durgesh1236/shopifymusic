import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../context/User'
import { SongData } from '../context/Song'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {fetchSong, fetchAlbums} = SongData()
    const { loginUser, btnLoading} = UserData()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        loginUser(email, password, navigate, fetchSong, fetchAlbums);
    }

  return (
    <div className='flex items-center justify-center h-screen max-h-screen'>
      <div className="text-white max-w-md bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h2 className='text-3xl font-semibold text-center mb-8'>Login to Shopify</h2>

        <form className='mt-8' onSubmit={submitHandler}>
            <div className="mb-4">
                <label className='block text-sm font-medium mb-1'>
                    Email or Username
                </label>
                <input type="email" onChange={(e)=>setEmail(e.target.value.toLowerCase())} placeholder='Email or Username' value={email} className='auth-input' required />
            </div>

            <div className="mb-4">
                <label className='block text-sm font-medium mb-1'>
                    Password
                </label>
                {/* <RiLockPasswordLine className='w-4 h-4'/> */}
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Password' className='auth-input' required />
            </div>
            <p onClick={()=>navigate('/reset-password')} className='mb-4 cursor-pointer text-gray-400 hover:text-green-500'>Forgot Password?</p>

            <button disabled={btnLoading} className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>
                {
                    btnLoading ? 
                    "Please Wait..."
                    : "Login"
                }
            </button>
        </form>

        <div className="text-center mt-6 flex justify-center">
            <p className="text-sm text-gray-400 pr-3">don't have account?</p>
            <Link to="/register" className="text-sm text-gray-400 hover:text-green-500 text-decoration-line: underline">Sign up for Shopify</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
