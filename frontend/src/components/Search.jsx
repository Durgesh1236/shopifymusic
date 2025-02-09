import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { SongData } from '../context/Song';
import Layout from './Layout';
import { FaMicrophone } from "react-icons/fa";
import { UserData } from '../context/User';

const Search = ({ setSearchBar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);
  const { song, setSelectedSong, setIsPlaying } = SongData();
  const { addToHistory } = UserData();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const results = song.filter((song) =>
        song.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSongs(results);
    } else {
      setFilteredSongs([]);
    }
  };

  const onclickHandler = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
    addToHistory(id);
  };

  const handleSearch = () => {
    if (searchQuery) {
      const results = song.filter((song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSongs(results);
    } else {
      setFilteredSongs([]);
    }
  };

  const emptyHandler = () => {
    setFilteredSongs([])
    setSearchQuery('')
  }

  // const startVoiceSearch = () => {
  //   if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  //     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  //     recognition.lang = 'en-US';
  //     recognition.start();

  //     recognition.onresult = (event) => {
  //       const transcript = event.results[0][0].transcript;
  //       setSearchQuery(transcript);
  //       handleSearchChange({ target: { value: transcript } });
  //     };

  //     recognition.onend = () => {
  //     };
  //   } else {
  //     alert('Voice recognition is not supported in this browser.');
  //   }
  // };
  const startVoiceSearch = async () => {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      try {
        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
  
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
          const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
          recognition.lang = 'en-US';
          recognition.start();
  
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setSearchQuery(transcript);
            filterSongs(transcript);
          };
        } else {
          alert('Voice recognition is not supported in this browser.');
        }
      } catch (error) {
        console.error('Microphone permission denied', error);
        alert('Please allow microphone access to use voice search.');
      }
    } else {
      alert('Your browser does not support microphone access.');
    }
  };
  

  return (
    <Layout className="text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-full max-w-[90%] sm:max-w-[50%] overflow-hidden">
        <input
          className="flex-1 outline-none bg-inherit text-sm min-w-0"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === 'Enter' && filteredSongs(searchQuery)}
        />
        <img
          onClick={handleSearch}
          className="w-4 cursor-pointer"
          src={assets.search_icon}
          alt="Search"
        />
        <p onClick={startVoiceSearch} className="inline w-4 cursor-pointer mx-2">
          <FaMicrophone />
        </p>
        <img
          onClick={emptyHandler}
          className="inline w-3 cursor-pointer ml-2"
          src={assets.cross_icon}
          alt="Close"
        />
      </div>

      {/* Display search results */}
      <div className="mt-4">
        {filteredSongs.length > 0 ? (
          <ul className="bg-black border rounded-md shadow-md p-3">
            {filteredSongs.map((item, index) => (
              <li
                key={index}
                className="text-white flex text-sm py-2 px-3 hover:bg-gray-700 rounded-md cursor-pointer"
                onClick={() => onclickHandler(item._id)}
              >
                <img src={item.thumbnail.url} className='w-9 mr-4' alt="" />
                <p className='pt-1'>{item.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          searchQuery && <p className="text-gray-500 text-sm">No results found.</p>
        )}
      </div>
    </Layout>
  );
};

export default Search;
