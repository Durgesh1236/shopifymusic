import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { SongData } from '../context/Song'
import AlbumItem from '../components/AlbumItem'
import SongItem from '../components/SongItem'
import { UserData } from '../context/User'
import { MdDelete } from 'react-icons/md'

const Home = () => {

  const { song, album } = SongData();
  const [myHistory, setMyHistory] = useState([])
  const { user, deleteRecentSong } = UserData();

  useEffect(() => {
    if (song && user && Array.isArray(user.playhistory)) {
      const filteredSongs = song.filter((e) => user.playhistory.includes(e._id.toString())
      );
      setMyHistory(filteredSongs);
    }
  }, [song, user]);

  const [updated, setUpdated] = useState(false);

  const deleteRecentHandler = (id) => {
    if (confirm("Are you sure you want to delete this song?")) {
      deleteRecentSong(id);
      console.log(id);
      setUpdated(true);
    }
  };

  useEffect(() => {
    if (updated) {
      window.location.reload(); // Reloads the page
    }
  }, [updated]);


  return (
    <>
      <Layout>
        <h1 id="lc" className=" mt-4 text-2xl font-bold mb-4 md:text-4xl bg-gradient-to-tr from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">Hi' {user.name}</h1>
        <div className='mb-4'>
          <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
          <div className='flex overflow-auto'>
            {album
              .filter((album) => album.description === "Song Album")
              .map((item, index) => (
                <AlbumItem
                  key={index}
                  name={item.title}
                  desc={item.description}
                  id={item._id}
                  image={item.thumbnail.url}
                />
              ))}
          </div>
        </div>

        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Best Movies Songs For You</h1>
          <div className="flex overflow-auto">
            {album
              .filter((album) => album.description === "Movies Songs")
              .map((item, index) => (
                <AlbumItem
                  key={index}
                  name={item.title}
                  desc={item.description}
                  id={item._id}
                  image={item.thumbnail.url}
                />
              ))}
          </div>
        </div>

        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Best Singer Album Songs</h1>
          <div className="flex overflow-auto">
            {album
              .filter((album) => album.description === "Singer Album")
              .map((item, index) => (
                <AlbumItem
                  key={index}
                  name={item.title}
                  desc={item.description}
                  id={item._id}
                  image={item.thumbnail.url}
                />
              ))}
          </div>
        </div>

        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Best Song Suggestion For You</h1>
          <div className="flex overflow-auto">
            {song
              .filter((song) => song.description === "Suggest Song")
              .map((item, index) => (
                <SongItem key={index}
                name={item.title}
                // desc={item.description}
                id={item._id}
                image={item.thumbnail.url}
              />
              ))}
          </div>
        </div>

        {/* User Play History */}

        {myHistory ?
          <div className='mb-4'>
            <h1 className='my-5 font-bold text-2xl'>Recent Play Songs</h1>
            <div className='flex overflow-auto'>
              {myHistory && myHistory.map((item, index) => (
                <div key={index} className="relative group">
                  {/* Song Item */}
                  <SongItem
                    name={item.title}
                    // desc={item.description}
                    id={item._id}
                    image={item.thumbnail.url}
                  />

                  {/* Delete Button (Appears on Hover) */}
                  <button
                    onClick={() => deleteRecentHandler(item._id)}
                    className='absolute top-3 right-4 bg-green-500 text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}
            </div>
          </div>
          : ""}

        <div className='mb-4'>
          <h1 className='my-5 font-bold text-2xl'>Best Bhakti Song</h1>
          <div className='flex overflow-auto'>
            {song
              .filter((song) => song.description === "Bhakti Song")
              .map((item, index) => (
                <SongItem key={index} 
                name={item.title} 
                // desc={item.description} 
                image={item.thumbnail.url} 
                id={item._id} />
              ))}
          </div>
        </div>

        <div className='mb-4'>
          <h1 className='my-5 font-bold text-2xl'>Best New Song</h1>
          <div className='flex overflow-auto'>
            {song
              .filter((song) => song.description === "New Song")
              .map((item, index) => (
                <SongItem key={index} 
                name={item.title} 
                // desc={item.description} 
                image={item.thumbnail.url} 
                id={item._id} />
              ))}
          </div>
        </div>

        <div className='mb-4'>
          <h1 className='my-5 font-bold text-2xl'>Best Punjabi Song</h1>
          <div className='flex overflow-auto'>
            {song
              .filter((song) => song.description === "Punjabi Song")
              .map((item, index) => (
                <SongItem key={index} 
                name={item.title} 
                // desc={item.description} 
                image={item.thumbnail.url} 
                id={item._id} />
              ))}
          </div>
        </div>

        <div className='mb-4'>
          <h1 className='my-5 font-bold text-2xl'>Best 90's Old Song</h1>
          <div className='flex overflow-auto'>
            {song
              .filter((song) => song.description === "90's Old Song")
              .map((item, index) => (
                <SongItem key={index} 
                name={item.title} 
                // desc={item.description}
                 image={item.thumbnail.url} 
                 id={item._id} />
              ))}
          </div>
        </div>

        <div className='mb-4'>
          <h1 className='my-5 font-bold text-2xl'>Best Bhojpuri Songs</h1>
          <div className='flex overflow-auto'>
            {song
              .filter((song) => song.description === "Bhojpuri Song")
              .map((item, index) => (
                <SongItem key={index} 
                name={item.title} 
                // desc={item.description} 
                image={item.thumbnail.url} 
                id={item._id} />
              ))}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home
