import React, { useState } from 'react'
import './Home.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
const Home = ({ sidebar, searchQuery }) => {

  console.log("succesfully query in home page come from app and i send it to feed component")
  const [category, setcategory] = useState(0)


  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setcategory={setcategory} />

      <div className={`container ${sidebar ? "" : "largecontainer"}`}>
        <Feed category={category} searchQuery={searchQuery} />
      </div>
    </>
  )
}

export default Home