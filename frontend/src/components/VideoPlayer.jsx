import React, { useEffect, useRef } from 'react'
import Layout from './Layout'
import { SongData } from '../context/Song';
import { useNavigate } from 'react-router-dom';

const VideoPlayer = () => {
    const { Videosong , selectedVideo,  setSelectedVideo, isMinimized,  setIsMinimized } = SongData();
    const videoRef = useRef(null);
    const navigate = useNavigate();
    const videoplay = () => {
        setTimeout(() => {
            videoRef.current?.play();
          }, 100);
    }

    useEffect(()=>{
        videoplay();
    },[selectedVideo])

      const handleClosePlayer = () => {
        videoRef.current?.pause();
        setSelectedVideo(null);
        navigate("/videos")
      };
    
      const toggleMiniplayer = () => {
        setIsMinimized(!isMinimized);
      };
    
  return (
    <Layout>
        {selectedVideo && (
          <div
            className={`fixed bg-black transition-all z-50 ${
              isMinimized
                ? 'bottom-4 right-4 w-64 h-36 rounded-xl shadow-lg'
                : 'top-0 left-0 w-full h-full'
            }`}
          >
            <video
              ref={videoRef}
              src={selectedVideo.videos.url}
              controls
              className={`${
                isMinimized ? 'w-full h-full rounded-xl' : 'w-full h-full'
              }`}
            ></video>

            {!isMinimized && (
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={toggleMiniplayer}
                  className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  Miniplayer
                </button>
                <button
                  onClick={handleClosePlayer}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            )}

            {isMinimized && (
              <button
                onClick={toggleMiniplayer}
                className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-600 text-xs"
              >
                Expand
              </button>
            )}
          </div>
        )}
    </Layout>
  )
}

export default VideoPlayer
