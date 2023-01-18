import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSong } from '../../slices/songPreviewSlice.js';

const FeedInstanceEntry = ({ element }) => {

  const previewSong = useSelector((state) => state.previewSong);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    console.log('mouse enter:', element);
    dispatch(setSong(element.preview_url));
  }

  const handleMouseLeave = () => {
    console.log('mouse enter:', element);
    dispatch(setSong(null));
  }

  return (
    <div className="mini-albumart"
      onMouseEnter={() => {
        handleMouseEnter();
        }}

      onMouseLeave={() => {
        handleMouseLeave();
      }}

      style={
        {backgroundImage: `url(${element.album.images[1].url})`}
      }
    >

    </div>
  )
}

export default FeedInstanceEntry;