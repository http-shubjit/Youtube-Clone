import React from 'react'
import './Video.css'
import Playvideo from '../../components/playvideo/Playvideo'
import Recomended from '../../components/recomended/Recomended'
import { useParams } from 'react-router-dom'
const Video = () => {

  const { videoId, categoryId } = useParams()
  return (
    <div className='playcontainer'>


      <Playvideo videoId={videoId} />
      <Recomended categoryId={categoryId} />
    </div>
  )
}

export default Video