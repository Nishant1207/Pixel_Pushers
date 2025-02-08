import { Route, Routes } from 'react-router'
import './App.css'
import Navbar from './Components/Navbar'
import { LoginPage } from './Pages/Login'
import { RegisterPage } from './Pages/Register'
import Home from './Pages/Home'
import CreatePost from './Pages/CreatePost'
import Community from './Pages/Community'
import Projects from './Pages/Projects'
import Events from './Pages/Events'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/createPost' element={<CreatePost />}/>
        <Route path='/community' element={<Community />}/>
        <Route path='/projects' element={<Projects />}/>
        <Route path='/events' element={<Events />}/>
      </Routes>
    </>
  )
}

export default App
