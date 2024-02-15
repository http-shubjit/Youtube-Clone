import React, { useEffect, useState } from 'react'
import './Playvideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, valueconvertor } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'



const Playvideo = () => {
  const { videoId } = useParams()

  const [apidata, setapidata] = useState(null)
  const [channeldata, setchanneldata] = useState(null)
  const [commentdata, setcommentdata] = useState([])


  const fetchvideodata = async () => {
    //API FOR VIDEODETAILS

    const videodetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`

    await fetch(videodetails_url).then(res => res.json()).then(data => setapidata(data.items[0]))
  }
  const fetchchanneldata = async () => {
    // API FOR CHANNEL-DETAILS
    const channeldataurl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${API_KEY}`;

    await fetch(channeldataurl)
      .then(res => res.json())
      .then(data => setchanneldata(data.items[0]))
      .catch(error => console.error('Error fetching channel data:', error));

    // API FOR FETCHING COMMENTDATA
    const commenturl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    await fetch(commenturl)
      .then(res => res.json())
      .then(data => setcommentdata(data.items))
      .catch(error => console.error('Error fetching comment data:', error));
  }




  //use effect for videidetaisl
  useEffect(() => {
    fetchvideodata()
  }, [videoId])

  //useeffect fir channeldetails
  useEffect(() => {
    fetchchanneldata()
  }, [apidata])


  return (
    <div className='playvideo'>

      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
      <h3>{apidata ? apidata.snippet.title : "Tittle Here"}</h3>
      <div className="playvideoinfo">
        <p>{apidata ? valueconvertor(apidata.statistics.viewCount) : "16K"} Views {apidata ? moment(apidata?.snippet?.publishedAt).fromNow() : ""}</p>
        <div>
          <span><img src={like} alt="" />{apidata ? valueconvertor(apidata.statistics.likeCount) : 166}</span>
          <span><img src={dislike} alt="" /></span>
          <span><img src={share} alt="" /></span>
          <span><img src={save} alt="" /></span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channeldata ? channeldata.snippet.thumbnails.default.url : ""} alt="" />
        <div>
          <p>{apidata ? apidata?.snippet.channelTitle : ""}</p>
          <span>{channeldata ? valueconvertor(channeldata.statistics.subscriberCount) : "110k"}</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="viddescription">
        <p>{apidata ? apidata.snippet.description.slice(0, 250) : "Description Here"}</p>
        <hr />
        <h4>{apidata ? valueconvertor(apidata.statistics.commentCount) : 102} Comments</h4>

        {commentdata.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1day ago</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="commentaction">
                  <img src={like} alt="" />
                  <span>{valueconvertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}



      </div>
    </div>
  )
}

export default Playvideo