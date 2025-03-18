import React from 'react'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import { UserData } from './context/User'
import Loading from './components/Loading'
import Admin from './pages/Admin'
import PlayList from './pages/PlayList'
import Album from './pages/Album'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Music from './pages/Music'
import MyProfile from './pages/MyProfile'
import Search from './components/Search'
import Contact from './pages/Contact'
import About from './pages/About'
import Career from './pages/Career'
import ApplyFormJob from './pages/ApplyFormJob'
import Videos from './pages/Videos'
import Player from './components/Player'

const App = () => {
  const { loading, user, isAuth } = UserData()
  return (
    <>
    <ToastContainer />
      {loading ? <Loading /> :
        <BrowserRouter>
          <Routes>
            <Route path='/' element={isAuth ? <Home /> : <Login />} />
            <Route path='/playlist' element={isAuth ? <PlayList user={user} /> : <Login />} />
            <Route path='/album/:id' element={isAuth ? <Album /> : <Login />} />
            <Route path='/admin' element={isAuth ? <Admin /> : <Login />} />
            <Route path='/login' element={isAuth ? <Home /> : <Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/email-verify' element={isAuth ? <Home/> : <EmailVerify />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/music' element={isAuth ? <Music /> : <Login/>} />
            <Route path='/search' element={isAuth ? <Search /> : <Login/>} />
            <Route path='/my-profile' element={ isAuth ? <MyProfile/> : <Login/>}/>
            <Route path='/contact' element={isAuth ? <Contact/> : <Login/>} />
            <Route path='/about' element={isAuth? <About/> : <Login/>} />
            <Route path='/videos' element={isAuth ? <Videos/> : <Login/>}/> 
            <Route path='/career' element={<Career/>}/>
            <Route path='/career/form' element={<ApplyFormJob/>}/>
            <Route path='/shopify/forever' element={<iframe src="https://forever-frontend-two.vercel.app" width="100%" height="1000px" className='bg-white w-full max-h-screen' title="External Site"></iframe>}/>
            <Route path='/shopify/vedantaAI' element={<iframe src="https://vedanta-ai.vercel.app" width="100%" height="1000px" className='bg-white w-full max-h-screen' title="External Site"></iframe>}/>
          </Routes>
          { isAuth ? <Player/> : <></>}
        </BrowserRouter>
      }
    </>
  )
}

export default App
