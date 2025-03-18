import React, { useEffect, useRef, useState } from 'react';
import { SongData } from '../context/Song';
import { GrChapterPrevious } from "react-icons/gr";
import { GrChapterNext } from "react-icons/gr";
import { FaPause, FaPlay } from "react-icons/fa6";
import { UserData } from '../context/User';

const Player = () => {
  const { singlesong, fetchSingleSong, 
    selectedSong, isPlaying, setIsPlaying, 
    previousMusic, nextMusic, handlePlayPause, 
    audioRef, bgcolor, setBgColor,
    volume, setVolume, handleVolumeChange,
    generateRandomColor, progress, setProgress,
     duration, setDuration, handleProgressChange } = SongData();
  const {addToHistory} = UserData();
  // const [progress, setProgress] = useState(0);
  // const [duration, setDuration] = useState(0);
  // const audioRef = useRef(null);
  // const [volume, setVolume] = useState(1);
  // const [bgcolor, setBgColor] = useState("#000000")
  const intervalRef = useRef(null); 
  
  useEffect(()=>{
    document.body.style.backgroundColor = bgcolor;
  },[bgcolor])
    
  
  // const handlePlayPause = () => {
  //   if (isPlaying) {
  //     audioRef.current.pause();
  //     setBgColor("#000000")
  //   } 
  //   else {
  //     audioRef.current.play();
  //     addToHistory(singlesong._id);
  //   }
  //   setIsPlaying(!isPlaying);
  // };

  
  // const handleVolumeChange = (e) => {
  //   const newVolume = e.target.value;
  //   setVolume(newVolume);
  //   audioRef.current.volume = newVolume;
  // };

  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (!audio) {
  //     return;
  //   }

  //   const handleLoadedMetaData = () => {
  //     setDuration(audio.duration);
  //   };

  //   const handleTimeUpdate = () => {
  //     setProgress(audio.currentTime);
  //   };

  //   audio.addEventListener("loadedmetadata", handleLoadedMetaData);
  //   audio.addEventListener("timeupdate", handleTimeUpdate);

  //   return () => {
  //     audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
  //     audio.removeEventListener("timeupdate", handleTimeUpdate);
  //   };
  // }, [singlesong]);


  // const handleProgressChange = (e) => {
  //   const newTime = (e.target.value / 100) * duration;
  //   audioRef.current.currentTime = newTime;
  //   setProgress(newTime);
  // };

  // useEffect(() => {
  //   if (isPlaying) {
  //     intervalRef.current = setInterval(generateRandomColor, 2000);
  //   } else {
  //     clearInterval(intervalRef.current);
  //   }

  //   return () => clearInterval(intervalRef.current);
  // }, [isPlaying]);

  return (
    <div>
      {singlesong && (
        <div className="h-[10%] flex justify-between items-center text-white px-4">
          <div className="lg:flex items-center gap-4">
            <img
              className="w-12"
              src={
                singlesong.thumbnail
                  ? singlesong.thumbnail.url
                  : "https://via.placeholder.com/50"
              }
              alt="Thumbnail"
            />
            <div className="hidden md:block">
              <p>{singlesong.title}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 m-auto">
            {singlesong && singlesong.audio && (
              <>
                {isPlaying ? (
                  <audio
                    ref={audioRef}
                    src={singlesong.audio.url}
                    autoPlay
                    onPlay={generateRandomColor} 
                  />
                ) : (
                  <audio ref={audioRef} src={singlesong.audio.url} />
                )}
              </>
            )}

            <div className="w-full flex items-center font-thin text-green-400">
              <input
                type="range"
                min="0"
                max="100"
                className="progress-bar w-[120px] md:w-[300px]"
                value={(progress / duration) * 100}
                onChange={handleProgressChange}
              />
            </div>
            <div className="flex justify-center items-center gap-4">
              <span onClick={previousMusic} className="cursor-pointer">
                <GrChapterPrevious />
              </span>

              <button onClick={()=> {handlePlayPause(); addToHistory(singlesong._id)}} className="bg-white text-black rounded-full p-2">
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <span onClick={nextMusic} className="cursor-pointer">
                <GrChapterNext />
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="range"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 md:w-32"
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
