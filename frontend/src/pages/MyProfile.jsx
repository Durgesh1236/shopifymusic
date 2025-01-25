import React, { useState } from 'react'
import Layout from '../components/Layout'
import { assets } from '../assets/assets'
import { UserData } from '../context/User'
import { toast } from 'react-toastify'

const MyProfile = () => {
    const {user} = UserData()
    const [file, setFile] = useState(null)
    const {btnLoading, addProfile} = UserData();
    const userid = user._id;
    
    const addProfileHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if(!file){
          toast.error("Click on image and choose Image From File");
        } else {
        formData.append("file", file);
        addProfile(userid, formData, setFile);
        }
      };
    

  return (
    <Layout>
      <div className="mt-10 flex gap-8 flex-col md:flex-row items-center md:items-center">
        {/* <img src={assets.user_photo} className='rounded-full w-40'/> */}
        <form onSubmit={addProfileHandler} className='flex flex-col items-center'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" id="image" accept='image/*' hidden/>
        <label htmlFor="image">
            {!file ? 
            <img className='w-44 cursor-pointer rounded-full' src={user.thumbnail ? user.thumbnail.url : assets.user_photo} alt="" />
            :
          <img className='w-44 cursor-pointer rounded-full' src={file ? URL.createObjectURL(file) : assets.user_photo} alt="" />
            }
        </label>
        <div className="mt-5 w-52">
        <button disabled={btnLoading} className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>
                {
                    btnLoading ? 
                    "Please Wait..."
                    : "Upload Image"
                }
            </button>
        </div>
        </form>

        <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <h2
        id="lc"
        className="text-2xl font-bold mb-4 md:text-4xl bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent"
      >
        Name: {user.name}
      </h2>
      <p className="text-lg font-medium md:text-2xl bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">
        Email: {user.email}
      </p>
    </div>
      </div>
    </Layout>
  )
}

export default MyProfile
