import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSong } from '../../slices/songPreviewSlice.js';
import spotify from '../../helpers/spotify.js'



const TopArtistsEntry = ({ artist }) => {

  const previewSong = useSelector((state) => state.previewSong);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const containerStyle = {
    backgroundImage: `url(${artist.images[1] ? artist.images[1].url : null})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }

  const handleMouseEnter = () => {
    console.log('mouse enter:', artist);
    dispatch(setSong(artist.track));
  }

  const handleMouseLeave = () => {
    console.log('mouse enter:', artist);
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
        spotify.getArtistDetails(user, dispatch, artist)
      }}
      >
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