import React from 'react';
import spotify from '../../helpers/spotify.js';
import { useSelector, useDispatch } from 'react-redux';
import { setSong } from '../../slices/songPreviewSlice.js';

const { useEffect } = React;

const AlbumEntry = ({ album }) => {

  const previewSong = useSelector((state) => state.previewSong);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    dispatch(setSong({type: 'FROM_ALBUM', track: album.tracks[0], album: album}));
  }

  const handleMouseLeave = () => {
    dispatch(setSong({}));
  }

  return (
    <div className="rec-wrapper">

      <div className="mini-albumart"
        onMouseEnter={() => {
          handleMouseEnter();
          }}

        onMouseLeave={() => {
          handleMouseLeave();
        }}

        onClick={() => {
          dispatch(setSong({}));
          // spotify.getRelated(user, dispatch, element)
        }}

        style={
          {backgroundImage: `url(${album.images[1].url})`}
        }
      >
        <div className="black-filter-small"></div>
      </div>
    </div>
  )
}

export default AlbumEntry;