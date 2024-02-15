import React, { useState, useEffect } from 'react'
import './Recomended.css'
import { API_KEY, valueconvertor } from '../../data'
import { Link } from 'react-router-dom'
const Recomended = ({ categoryId }) => {

  const [apidata, setapidata] = useState([])
  const fetchdata = async () => {
    try {
      const realtedvdo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;

      const response = await fetch(realtedvdo_url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      setapidata(data.items);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    fetchdata()
  }, [])

  return (
    <div className='recomended'>
      {apidata.map((item, index) => {
        return (
          <Link
            to={`/video/${item.snippet.categoryId}/${item.id}`}
            className="sidevideolist" key={index}>
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vidinfo">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{valueconvertor(item.statistics.viewCount)} Views</p>
            </div>
          </Link>
        )
      })}


    </div>
  )
}

export default Recomended