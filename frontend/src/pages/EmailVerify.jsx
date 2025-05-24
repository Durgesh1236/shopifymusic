import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/User';
import { SongData } from '../context/Song';
import { assets } from '../assets/assets';

const EmailVerify = () => {

  axios.defaults.withCredentials = true;
  const inputRefs = React.useRef([]);
  const navigate = useNavigate();
  const {verifyEmailUser, resendOtp, btnLoading} = UserData();
  const { fetchSong, fetchAlbums } = SongData();

  const handleInput = (e, index) => {
    if(e.target.value.length > 0 && index < inputRefs.current.length-1){
      inputRefs.current[index+1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
      inputRefs.current[index-1].focus();
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index)=> {
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value);
      const otp = otpArray.join('');
      verifyEmailUser(otp, navigate, fetchSong, fetchAlbums)
  }

  const resendOtpHandler = async (e) => {
    e.preventDefault()
    resendOtp();
  }

  return (
    <div className='flex items-center justify-center min-h-screen max-h-screen bg-no-repeat bg-cover bg-center'
    style={{ backgroundImage: `url(${assets.background})`}}
    >
      <form onSubmit={onSubmitHandler} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email id.</p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {
            Array(6).fill(0).map((_, index)=>(
              <input type="text" 
              className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
               maxLength='1' key={index} 
               ref={e => inputRefs.current[index] = e} 
               onInput={(e)=> handleInput(e,index)} 
               onKeyDown={(e)=>handleKeyDown(e,index)}
               required/>
            ))}
        </div>
        
        {/* <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Verify Email</button> */}
        <button disabled={btnLoading} className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>
                {
                    btnLoading ? 
                    "Please Wait..."
                    : "Verify Email"
                }
            </button>
        <button onClick={resendOtpHandler} className='w-full py-3 mt-2 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Send Otp</button>
      </form>
    </div>
  )
}

export default EmailVerify