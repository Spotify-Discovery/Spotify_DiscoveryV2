import React from 'react';
import spotify from '../../helpers/spotify.js';
import { useSelector, useDispatch } from 'react-redux';
import { setSong } from '../../slices/songPreviewSlice.js';

const RelatedArtistsEntry = ({ artist }) => {

  const previewSong = useSelector((state) => state.previewSong);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    // console.log('mouse enter:', element);
    dispatch(setSong(artist.track));
  }

  const handleMouseLeave = () => {
    // console.log('mouse enter:', element);
    dispatch(setSong({}));
  }

  return (
    <div className="rec-wrapper">

      <div className="mini-albumart mini-artist-art"
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

        style={
          {backgroundImage: `url(${artist.images[1].url})`}
        }
      >
        <div className="black-filter-small artist-filter"></div>
      </div>
    </div>
  )
}

export default RelatedArtistsEntry;