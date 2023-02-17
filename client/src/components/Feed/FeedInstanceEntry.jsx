import React from 'react';
import spotify from '../../helpers/spotify.js';
import { useSelector, useDispatch } from 'react-redux';
import { setSong } from '../../slices/songPreviewSlice.js';
import { setContextMenuClicked, setContextMenuPosition, setContextInfo } from "../../slices/contextMenuSlice.js";

const FeedInstanceEntry = ({ element }) => {
  const previewSong = useSelector((state) => state.previewSong);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    dispatch(setSong(element));
  }

  const handleMouseLeave = () => {
    dispatch(setSong({}));
  }

  return (
    <div className="rec-wrapper"
      onContextMenu={(e) => {
        e.preventDefault();
        dispatch(setContextMenuClicked(true));
        dispatch(setContextMenuPosition({ x: e.pageX, y: e.pageY }));
        dispatch(setContextInfo(element));
      }}
    >

      <div className="mini-albumart"
        onMouseEnter={() => {
          handleMouseEnter();
          }}

        onMouseLeave={() => {
          handleMouseLeave();
        }}

        onClick={() => {
          dispatch(setSong({}));
          spotify.getRelated(user, dispatch, element)
        }}

        style={
          {backgroundImage: `url(${element.album.images[1].url})`}
        }
      >
        <div className="black-filter-small"></div>
      </div>
    </div>
  )
}

export default FeedInstanceEntry;