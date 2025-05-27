import React, { useEffect } from 'react';
import { SongData } from '../context/Song';
import { GrChapterPrevious } from "react-icons/gr";
import { GrChapterNext } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa6";
import { UserData } from '../context/User';

const Player = () => {
  const { singlesong, fetchSingleSong,
    selectedSong, isPlaying,
    previousMusic, nextMusic, handlePlayPause,
    audioRef, bgcolor,
    volume, handleVolumeChange,
    generateRandomColor, progress,
    duration, handleProgressChange } = SongData();
  const { addToHistory } = UserData();
  // const intervalRef = useRef(null); 

  useEffect(() => {
    document.body.style.backgroundColor = bgcolor;
  }, [bgcolor])

  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

  return (
    <div>
      {singlesong && (
        <div className="fixed bottom-[-1px] left-0 right-0 h-20 text-white flex items-center justify-between px-6 z-40"
          style={{
            transition: 'background-color 0.5s ease',
            backgroundColor: bgcolor
          }}
        >

          {/* Song Info Section */}
          <div className="flex items-center gap-4 w-1/3">
            <img
              className="w-12 h-12 object-cover rounded"
              src={singlesong.thumbnail ? singlesong.thumbnail.url : "https://via.placeholder.com/50"}
              alt="Thumbnail"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium">{singlesong.title}</p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col md:mt-1 items-center justify-center gap-1 w-1/3">
            {singlesong && singlesong.audio && (
              <>
                <audio
                  ref={audioRef}
                  src={singlesong.audio.url}
                  autoPlay={isPlaying}
                  onPlay={generateRandomColor}
                  onEnded={() => {
                    nextMusic();
                  }}
                />
              </>
            )}

            {/* Progress Bar */}
            <div className="flex items-center w-full justify-center text-green-400">
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (progress / duration) * 100 : 0}
                onChange={handleProgressChange}
                className="progress-bar w-48 md:w-72"
              />
            </div>

            {/* Play/Pause + Navigation */}
            <div className="flex items-center gap-6">
              <span onClick={previousMusic} className="cursor-pointer text-xl">
                <GrChapterPrevious />
              </span>

              <button
                onClick={() => {
                  handlePlayPause();
                  addToHistory(singlesong._id);
                }}
                className="bg-white text-black rounded-full p-3 hover:bg-gray-200"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <span onClick={nextMusic} className="cursor-pointer text-xl">
                <GrChapterNext />
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-end w-1/3">
            <input
              type="range"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 md:w-32"
              step="0.01"
              min="0"
              max="1"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
