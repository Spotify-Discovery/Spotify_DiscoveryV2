import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSong } from '../../slices/songPreviewSlice.js';


const TopArtistsEntry = ({ artist }) => {

  const previewSong = useSelector((state) => state.previewSong);
  const dispatch = useDispatch();

  const containerStyle = {
    backgroundImage: `url(${artist.images[1].url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }

  const handleMouseEnter = () => {
    console.log('mouse enter:', artist);
    dispatch(setSong(artist.preview_url));
  }

  const handleMouseLeave = () => {
    console.log('mouse enter:', artist);
    dispatch(setSong(null));
  }

  return (
    <div className="top-entry" style={containerStyle}
      onMouseEnter={() => {
        handleMouseEnter();
        }}

      onMouseLeave={() => {
        handleMouseLeave();
      }}>
      <div className="black-filter"></div>
      <div className="item-info">
        <div className="item-name">{artist.name}</div>
        <div className="item-details">{artist.genres[0]}</div>
        <div className="item-popularity">{'Popularity ' + artist.popularity}</div>
      </div>
    </div>
  )
}

export default TopArtistsEntry;

// const pictureStyle = {
//   backgroundImage: `url(${artist.images[2].url})`,
//   height: '150px',
//   width: '150px',
//   backgroundSize: 'cover',
//   backgroundRepeat: 'no-repeat',
//   borderRadius: '20px'
// }