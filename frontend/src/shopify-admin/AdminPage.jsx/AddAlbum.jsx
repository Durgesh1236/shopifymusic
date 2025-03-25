import React, { useState } from 'react'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../context/User';
import { SongData } from '../../context/Song';
const AddAlbum = () => {

   const { user } = UserData();
    const { album, song, addAlbum, loading, addSong, addThumbnail, deleteSong, deleteAlbum, Videosong, addVideoSong,addVideoThumbnail } = SongData();
    const navigate = useNavigate();
  
    if (user && user.role !== "admin") {
      return navigate("/");
    }
  
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const fileChangeHandler = (e) => {
      const file = e.target.files[0];
      setFile(file);
    }

    const addAlbumHandler = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", file);
      addAlbum(formData, setTitle, setDescription, setFile);
    };

  return loading ? <div className='grid place-items-center min-h-[80vh]'>
  <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
</div> : (
    <form onSubmit={addAlbumHandler} className='flex flex-col items-start gap-8 text-gray-600 '>
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input onChange={fileChangeHandler} type="file" id="image" accept='image/*' hidden />
        <label htmlFor="image">
          <img className='w-24 cursor-pointer' src={file ? URL.createObjectURL(file) : assets.upload_area} alt="" />
        </label>
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Album name</p>
        <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here' required/>
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Album description</p>
        <input onChange={(e)=>setDescription(e.target.value)} value={description} type="text" className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here' required/>
      </div>

      <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>
    </form>
  )
}

export default AddAlbum
