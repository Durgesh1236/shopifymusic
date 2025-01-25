import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { SongData } from '../context/Song';
import Layout from './Layout';

const Search = ({ setSearchBar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);
  const { song ,setSelectedSong, setIsPlaying} = SongData();
  console.log(filteredSongs);

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
  };

  const emptyHandler = () =>{
    setFilteredSongs([])
    setSearchQuery('')
  }

  return (
    <Layout className="text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <img className="w-4 cursor-pointer" src={assets.search_icon} alt="Search" />
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
