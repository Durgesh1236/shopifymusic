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
            <Route path='/register' element={isAuth ? <Home /> : <Register />} />
            <Route path='/email-verify' element={<EmailVerify />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/music' element={<Music />} />
            <Route path='/search' element={<Search />} />
            <Route path='/my-profile' element={ isAuth ? <MyProfile/> : <Login/>}/>
          </Routes>
        </BrowserRouter>
      }
    </>
  )
}

export default App
