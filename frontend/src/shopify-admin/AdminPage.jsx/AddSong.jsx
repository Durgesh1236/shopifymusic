import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../context/User';
import { SongData } from '../../context/Song';
import { assets } from '../../assets/assets';

const AddSong = () => {
  const { user } = UserData();
  const { album, song, addAlbum, loading, addSong, addThumbnail, fetchSong } = SongData();
  const navigate = useNavigate();
  const [visibleThumbnail, setvisibleThumbnail] = useState(false);

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
  };

  const addSongHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("singer", singer);
    formData.append("album", Album);
    addSong(formData, setTitle, setDescription, setFile, setSinger, setAlbum, setvisibleThumbnail);
  };

  const addThumbnailHandler = (id) => {
    const formData = new FormData();
    formData.append("file", file);
    addThumbnail(id, formData, setFile, setvisibleThumbnail);
  };

  useEffect(() => {
    fetchSong();
  }, [])


  return loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className='h-[80vh] overflow-y-scroll'>
      {visibleThumbnail ?
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input onChange={fileChangeHandler} type="file" id="image" accept='image/*' hidden />
          <label htmlFor="image">
            <img src={file ? URL.createObjectURL(file) : assets.upload_area} className='w-24 cursor-pointer' alt="" />
          </label>
          {song && song.map((item, index) => (
            item.thumbnail ?
              ""
              : <button onClick={() => addThumbnailHandler(item._id)} className='text-base w-52 h-10 bg-black text-white cursor-pointer'>Add Thumbnail</button>
          ))}
        </div>
        :
        <form onSubmit={addSongHandler} className='flex flex-col items-start gap-8 text-gray-600 p-4'>
          <div className="flex gap-8">
            <div className="flex flex-col gap-4">
              <p>Upload song</p>
              <input
                onChange={fileChangeHandler}
                type="file"
                id="song"
                accept='audio/*'
                required
                hidden
              />
              <label htmlFor="song">
                <img src={file ? assets.upload_added : assets.upload_song} className='w-24 cursor-pointer' alt="" />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <p>Song name</p>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
              placeholder='Type Here'
              required
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <p>Song description</p>
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
              placeholder='Type Here'
              required
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <p>Singer</p>
            <input
              onChange={(e) => setSinger(e.target.value)}
              value={singer}
              type="text"
              className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'
              placeholder='Type Here'
              required
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <p>Album</p>
            <select
              onChange={(e) => setAlbum(e.target.value)}
              defaultValue={Album}
              className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]'
            >
              <option value="none">None</option>
              {album.map((item, index) => (
                <option value={item._id} key={index}>{item.title}</option>
              ))}
            </select>
          </div>

          <button type='submit' className='text-base bg-black text-white py-2.5 px-14 mb-10 cursor-pointer'>ADD</button>
        </form>
      }
    </div>
  );
};

export default AddSong;