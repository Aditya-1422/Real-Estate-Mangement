import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './components/Profile'
import PrivateProfile from './components/PrivateProfile'

const App = () => {
  return (
    <>
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/sign-up' element={<SignUp/>}/>
            <Route exact path='/sign-in' element={<SignIn/>}/>
            <Route element={<PrivateProfile/>}>
              <Route exact path='/profile' element={<Profile/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App