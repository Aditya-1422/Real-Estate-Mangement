import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
          <Route exact path='/' element={<Home/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/sign-in' element={<SignIn/>}/>
        <Route exact path='/sign-up' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}