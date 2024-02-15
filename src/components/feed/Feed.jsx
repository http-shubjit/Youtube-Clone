import React, { useEffect, useState } from 'react'
import './Feed.css'

import { Link } from 'react-router-dom'
import { API_KEY, valueconvertor } from '../../data'
import moment from 'moment'
const Feed = ({ category, searchQuery }) => {

  console.log("now query in feed component and the query is " + searchQuery + "sorry to say fetching not work")


  const [data, setdata] = useState([])
  const fetchdata = async () => {
    try {
      let videolist_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

      const response = await fetch(videolist_url);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (searchQuery) {
        videolist_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&key=${API_KEY}`;
        const searchResponse = await fetch(videolist_url);

        if (!searchResponse.ok) {
          throw new Error(`Failed to fetch data. Status: ${searchResponse.status}`);
        }

        const searchData = await searchResponse.json();
        setdata(searchData.items);
      } else {
        setdata(responseData.items);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  useEffect(() => {
    fetchdata();
  }, [category, searchQuery]);


  return (

    <div className='feed'>
      {data.map((item, index) => {
        return (
          <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="feed" key={index}>
            <div className='card'>
              <img src={item.snippet.thumbnails.medium.url} alt="" />
              <h2>{item.snippet.title}</h2>
              <h3>{item.snippet.channelTitle}</h3>
              <p>{item.statistics && valueconvertor(item.statistics.viewCount)} Views  {moment(item.snippet.publishedAt).fromNow()}</p>

            </div>

          </Link>
        )
      }

      )
      }


    </div>




  )
}

export default Feed