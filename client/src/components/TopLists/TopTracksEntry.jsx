import React from 'react';
import spotify from '../../helpers/spotify.js'
import { useSelector, useDispatch } from 'react-redux';
import { setSong } from '../../slices/songPreviewSlice.js';
import { addToFeed } from '../../slices/userSlice.js';

const TopTracksEntry = ({ track }) => {

  const previewSong = useSelector((state) => state.previewSong);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const containerStyle = {
    backgroundImage: `url(${track.album.images[1].url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }


  const handleMouseEnter = () => {
    console.log('mouse enter:', track);
    dispatch(setSong(track));
  }

  const handleMouseLeave = () => {
    console.log('mouse enter:', track);
    dispatch(setSong({}));
  }

  return (
    <div className="top-entry" style={containerStyle}
      onMouseEnter={() => {
        handleMouseEnter();
        }}

      onMouseLeave={() => {
        handleMouseLeave();
      }}

      onClick={() => {
        dispatch(setSong({}));
        spotify.getRelated(user, dispatch, track)
      }}
        >
      <div className="black-filter"></div>
      <div className="item-info">
        <div className="item-name">{track.name}</div>
        <div className="item-details">{track.artists[0].name}</div>
        <div className="item-popularity">{'Popularity ' + track.popularity}</div>
      </div>
    </div>
  )
}

export default TopTracksEntry;