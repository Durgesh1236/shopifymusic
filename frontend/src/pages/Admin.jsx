import React, { useState } from 'react'
import { UserData } from '../context/User'
import { Link, useNavigate } from 'react-router-dom';
import { SongData } from '../context/Song';
import { MdDelete } from "react-icons/md";

const Admin = () => {
  const { user } = UserData();
  const { album, song, addAlbum, loading, addSong, addThumbnail, deleteSong, deleteAlbum } = SongData();
  const navigate = useNavigate();

  if (user && user.role !== "admin") {
    return navigate("/");
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [singer, setSinger] = useState("");
  const [Album, setAlbum] = useState("");
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

  // song add function
  const addSongHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("singer", singer);
    formData.append("album", Album);
    addSong(formData, setTitle, setDescription, setFile, setSinger, setAlbum);
  };

  const addThumbnailHandler = (id) =>{
    const formData = new FormData();
    formData.append("file", file);
    addThumbnail(id, formData, setFile);
  };

  const deleteHandler = (id) => {
    if(confirm("Are you sure you want to delete this song")){
      deleteSong(id);
    }
  }

  const deleteAlbumHandler = (id) => {
    if(confirm("Are you sure you want to delete this song")){
      deleteAlbum(id);
    }
  }

  return (
    <div className='min-h-screen bg-[#212121] text-white p-8'>
      <Link to="/" className='bg-green-500 text-white font-bold py-2 px-4 rounded-full'>Go to home page</Link>
      
      {/* add album */}
      <h2 className='text-2xl font-bold mb-6 mt-6'>Add Album</h2>
      <form onSubmit={addAlbumHandler} className="bg-[#181818] p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className='block text-sm font-medium mb-1'>
            Title
          </label>
          <input
            type="text"
            onChange={(e)=>setTitle(e.target.value)} 
            value={title}  
            placeholder='Title'
            className='auth-input' required />
        </div>

        <div className="mb-4">
          <label className='block text-sm font-medium mb-1'>
            Description
          </label>
          <input
            type="text"
            onChange={(e)=>setDescription(e.target.value)} 
            value={description}
            placeholder='Description'
            className='auth-input' required />
        </div>

        <div className="mb-4">
          <label className='block text-sm font-medium mb-1'>
            Image
          </label>
          <input type="file" onChange={fileChangeHandler} accept='image/*' className='auth-input' required />
        </div>

        <button disabled={loading} className='auth-btn' style={{ width: "100px" }}>
          {loading ? "Please Wait..." : "Add"}
        </button>
      </form>

        {/* Song added */}
      <h2 className='text-2xl font-bold mb-6 mt-6'>Add Songs</h2>
      <form onSubmit={addSongHandler} className="bg-[#181818] p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className='block text-sm font-medium mb-1'>
            Title
          </label>
          <input
            type="text"
            onChange={(e)=>setTitle(e.target.value)} 
            value={title} 
            placeholder='Title'
            className='auth-input' required />
        </div>

        <div className="mb-4">
          <label className='block text-sm font-medium mb-1'>
            Description
          </label>
          <input
            type="text"
            onChange={(e)=>setDescription(e.target.value)} 
            value={description} 
            placeholder='Description'
            className='auth-input' required />
        </div>

        <div className="mb-4">
          <label className='block text-sm font-medium mb-1'>
            Singer
          </label>
          <input
            type="text"
            onChange={(e)=>setSinger(e.target.value)} 
            value={singer} 
            placeholder='Singer'
            className='auth-input' required />
        </div>

        <select className='auth-input' value={Album} onChange={(e)=>setAlbum(e.target.value)} >
          <option value="">Choose Album</option>
          {album && album.map((item, index) => (
            <option value={item._id} key={index}>{item.title}</option>
          ))}
        </select>

        <div className="mb-4">
          <label className='block text-sm font-medium mb-1'>
            Audio
          </label>
          <input type="file" onChange={fileChangeHandler} accept='audio/*' className='auth-input' required />
        </div>

        <button disabled={loading} className='auth-btn' style={{ width: "100px" }}>
          {loading ? "Please Wait..." : "Add"}
        </button>
      </form>

      {/* Album added list */}
      <div className="mt-8">
        <h3 className='text-xl font-semibold mb-4'>Added Albums</h3>
        <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
          {
            album && album.map((item,index)=>(
              <div key={index} className="bg-[#181818] p-4 rounded-lg shadow-md">
                <img src={item.thumbnail.url} alt="" className='mr-1 w-52 h-52'  />
                <h4 className='text-lg font-bold'>{item.title}</h4>
                <h4 className='text-sm text-gray-500'>{item.description}</h4>
                <button onClick={()=>deleteAlbumHandler(item._id)} className='px-3 py-1 bg-red-500 text-white rounded'><MdDelete /></button>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className='text-xl font-semibold mb-4'>Added Songs</h3>
        <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
          {
            song && song.map((item,index)=>(
              <div key={index} className="bg-[#181818] p-4 rounded-lg shadow-md">
                {
                  item.thumbnail ?
                  <img src={item.thumbnail.url} alt="" className='mr-1 w-52 h-52'  /> 
                  :
                  <div className="flex flex-col justify-center items-center gap-2">
                    <input type='file' onChange={fileChangeHandler}/>
                    <button onClick={()=>addThumbnailHandler(item._id)} className='bg-green-500 text-white px-2 py-1 rounded'>Add Thumbnail</button>
                  </div>
                }

                <h4 className='text-lg font-bold'>{item.title}</h4>
                <h4 className='text-sm text-gray-500'>{item.singer}</h4>
                <h4 className='text-sm text-gray-500'>{item.description}</h4>

                <button onClick={()=>deleteHandler(item._id)} className='px-3 py-1 bg-red-500 text-white rounded'><MdDelete /></button>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
};

export default Admin
