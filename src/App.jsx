import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Video from './pages/video/Video'

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    console.log(" i am in app page,successfully my query come from navbar searchbox and i send to it home page")
    setSearchQuery(query);
  };
  return (
    <div>

      <Navbar setSidebar={setSidebar} onSearch={handleSearch} />

      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} searchQuery={searchQuery} />} />
        <Route path='/video/:categoryId/:videoId' element={<Video />} />
      </Routes>

    </div>
  )
}

export default App