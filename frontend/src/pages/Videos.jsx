import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { SongData } from '../context/Song';

import { BiLike, BiSolidLike } from "react-icons/bi";

import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";

export default function App() {
  const videoRef = useRef(null);
  const [like, setLike] = useState(false);
  const [countLike, setCountLike] = useState("0");
  const [dislike, setDisLike] = useState(false);
  const [countDisLike, setCountDisLike] = useState(0);
  
  const {
    fetchVideoSong,
    Videosong,
    selectedVideo,
    setSelectedVideo,
    isMinimized,
    setIsMinimized,
    likeVideo,
    dislikeVideo
  } = SongData();
  

  // console.log(countLike)

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsMinimized(false);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  const handleClosePlayer = () => {
    videoRef.current?.pause();
    setSelectedVideo(null);
  };

  const toggleMiniplayer = () => {
    setIsMinimized(!isMinimized);
  };

  useEffect(()=>{
    fetchVideoSong();
  },[])

  return (
    <Layout>
      <div className="min-h-screen mt-8 mb-32 text-white p-4">
        {/* Video Thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Videosong.map((video) => (
            <div
              key={video._id}
              onClick={() => handleVideoClick(video)}
              className="bg-gray-800 cursor-pointer rounded-2xl overflow-hidden hover:scale-105 transition duration-300"
            >
              <div className=" relative z-10">
                <img
                  src={video.thumbnail.url}
                  alt={video.description}
                  className="w-full z-10 h-48 sm:h-56 md:h-40 lg:h-56 object-cover"
                />
                {/* {video.length && (
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-xs px-1 rounded">
                    {video.length}
                  </span>
                )} */}
              </div>
              <div className="p-4">
                <h2 className="text-sm font-semibold mb-1 line-clamp-2">{video.description}</h2>
                <p className="text-xs text-gray-400">T-Series</p>
                <p className="text-xs text-gray-400">1M views • 3:00</p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Overlay */}
        {selectedVideo && (
          <div
            className={`fixed bg-black transition-all z-50 overflow-y-scroll ${
              isMinimized
                ? 'bottom-24 right-4 w-72 h-48 sm:bottom-24 sm:right-6 sm:w-80 sm:h-56 rounded-xl shadow-lg'
                : 'top-0 left-0 w-full h-full'
            }`}
          >
            <div className={`flex w-full h-full`}>
              <div className={`${isMinimized ? 'w-full h-full' : ' w-full h-full'}`}>
              <video
              ref={videoRef}
              src={selectedVideo.videos.url}
              controls
              className={`${ isMinimized ? 'w-full h-full rounded-xl' : 'w-[98%] h-[45%] lg:h-[80%] md:mt-9 ml-1 mt-2'}`}
            ></video> 

                {/* Expanded Player Content */}
                {!isMinimized && (
                  <div className="px-4">
                    {/* Video Controls */}
                    <div className="absolute top-6 right-[30px] lg:top-8 lg:right-[460px] md:top-8 md:right-[350px] flex gap-2">
                      <button
                        onClick={toggleMiniplayer}
                        className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-600 text-xs sm:text-sm"
                      >
                        Miniplayer
                      </button>
                      <button
                        onClick={handleClosePlayer}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs sm:text-sm"
                      >
                        Close
                      </button>
                    </div>

                    <div className="mt-12 md:mt-10 w-full md:w-[98%]">
                      <h3 className="text-lg md:text-xl font-semibold">{selectedVideo.description}</h3>

                      <div className="flex justify-between items-center mt-2 text-xs md:text-sm text-gray-400">
                        <p>1M views • 3:00</p>
                        <div className="flex space-x-4">
                          <button className="flex items-center space-x-1">
                            { 
                              like ? <><BiSolidLike className='text-xl' onClick={()=> {setLike(false); likeVideo(selectedVideo._id); setCountLike(selectedVideo.likes)}} /> 
                              <span>{countLike}</span> </>                   
                                  :<>
                              <BiLike className='text-xl' onClick={()=> {setLike(true); likeVideo(selectedVideo._id); setCountDisLike(selectedVideo.dislikes)}}/> <span>{countLike}</span>
                              </>
                            }
                            
                          </button>
                          <button className="flex items-center space-x-1 hover:text-white">
                         { dislike ? <><BiSolidDislike className='text-xl' onClick={()=> {setDisLike(false); setCountDisLike(dislike-1)}}/><span>{countDisLike}</span></> :
                            <><BiDislike className='text-xl' onClick={()=> {setDisLike(true); setCountDisLike(dislike+1)}}/> <span>{countDisLike}</span></>
                         }
                          </button>
                          <button className="flex items-center space-x-1 hover:text-white">
                            🔗 Share
                          </button>
                        </div>
                      </div>

                      <hr className="my-4 border-gray-600" />

                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-xl font-bold">
                          T
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">T-Series</p>
                          <p className="text-xs text-gray-400">150M Subscribers</p>
                        </div>
                        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-xs sm:text-sm">
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Miniplayer Toggle */}
                {isMinimized && (
                  <button
                    onClick={toggleMiniplayer}
                    className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-600 text-xs"
                  >
                    Expand
                  </button>
                )}
              </div>

              {/* Recommended Videos Sidebar */}
              {!isMinimized && (
                <div className="hidden max-h-full md:block w-[35%] p-4">
                  <h3 className="text-lg font-semibold mb-4">Recommended Videos</h3>
                  {Videosong.map((video) => (
                    <div
                      key={video._id}
                      onClick={() => handleVideoClick(video)}
                      className="mb-4 ml-10 cursor-pointer"
                    >
                      <div className="relative">
                        <img
                          src={video.thumbnail.url}
                          alt={video.description}
                          className="w-52 h-20 md:h-36 object-cover rounded-lg"
                        />
                        {video.length && (
                          <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-xs px-1 rounded">
                            {video.length}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 w-60">
                        <h4 className="text-sm font-semibold line-clamp-2">{video.description}</h4>
                        <p className="text-xs text-gray-400">T-Series</p>
                        <p className="text-xs text-gray-400">1M views • 3:00</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
