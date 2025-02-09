import { Route, Routes } from 'react-router-dom'; // Changed from 'react-router'
import './App.css'
import Navbar from './Components/Navbar'
import { LoginPage } from './Pages/Login'
import { RegisterPage } from './Pages/Register'
import Home from './Pages/Home'
import CreatePost from './Pages/CreatePost'
import Community from './Pages/Community'
import Projects from './Pages/Projects'
import Events from './Pages/Events'
import RedditFeed from './Pages/RedditFeed'

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
        <Route path='/redditfeed' element={<RedditFeed />} />  {/* updated route path */}
      </Routes>
    </>
  )
}

export default App
