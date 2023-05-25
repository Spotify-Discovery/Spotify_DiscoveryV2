import React from "react";
import spotify from "../helpers/spotify";
import { setSong, toggleLoading } from "../slices/songPreviewSlice.js";
import { useSelector, useDispatch } from "react-redux";

const { useState, useEffect } = React;

const TrackResult = ({ track }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
      if (track.preview_url) {
        dispatch(setSong(track));
      } else {
        console.log('no preview url', track.preview_url)
        spotify.getPreview(user, dispatch, track)
        .then((data) => {
          console.log("preview data:", data);
          dispatch(toggleLoading(false));
          dispatch(setSong({...track, preview_url: data}));
        });
      }
  };

  const handleMouseLeave = () => {
    dispatch(toggleLoading(false));
    dispatch(setSong({}));
  };

  return (
    <div
      className="track-result"
      onClick={() => {
        dispatch(setSong({}));
        spotify.getRelated(user, dispatch, track);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img className="track-result-img" src={track.album.images[0].url} />

      <div className="track-result-text">
        <div className="track-result-name">{track.name}</div>
        <div className="track-result-artist">{track.artists[0].name}</div>
      </div>
    </div>
  );
};

export default TrackResult;
