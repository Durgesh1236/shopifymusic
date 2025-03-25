import React, { useEffect, useState } from 'react';
import { UserData } from '../../context/User';

const Userdata = () => {
  const { totalusers, onlineUsers, fetchTotalUsers } = UserData(); 
  const [count, setCount] = useState(0);
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    let start = 0;
    let onlineStart = 0;
    const end = totalusers;
    const onlineUserEnd = onlineUsers;

    if (start === end && onlineStart === onlineUserEnd) return;

    let duration = 5000; 
    let incrementTime = 200;
    let increment = Math.ceil(end / (duration / incrementTime));
    let increment2 = Math.ceil(onlineUserEnd / (duration / incrementTime));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);

    const timer2 = setInterval(() => {
      onlineStart += increment2;
      if (onlineStart >= onlineUserEnd) {
        onlineStart = onlineUserEnd;
        clearInterval(timer2);
      }
      setOnlineCount(onlineStart);
    }, incrementTime);

    return () => {
      clearInterval(timer);
      clearInterval(timer2);
    };
  }, [totalusers, onlineUsers]);

  useEffect(()=>{
          fetchTotalUsers();
        },[])

  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-center items-center md:justify-start md:items-start gap-3 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-80 h-40 text-center border border-gray-200">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700">Total Registered Users</h2>
        <div className="text-4xl md:text-5xl font-bold text-blue-600 transition-all duration-1000 ease-out">
          {count} +
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-80 h-40 text-center border border-gray-200">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700">Total Online Users</h2>
        <div className="text-4xl md:text-5xl font-bold text-blue-600 transition-all duration-1000 ease-out">
          {onlineCount} +
        </div>
      </div>
    </div>
  );
};

export default Userdata;
