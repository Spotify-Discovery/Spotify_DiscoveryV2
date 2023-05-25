import React from "react";
import spotify from "../helpers/spotify";
const { useState, useEffect } = React;
import { setSong, toggleLoading } from "../slices/songPreviewSlice.js";
import { useSelector, useDispatch } from "react-redux";

const ArtistResult = ({ artist }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    spotify.getPreviewForArtist(user, dispatch, artist).then((data) => {
      console.log("preview data:", data);
      dispatch(toggleLoading(false));
      dispatch(setSong({ ...data }));
    });
  };

  const handleMouseLeave = () => {
    dispatch(toggleLoading(false));
    dispatch(setSong({}));
  };

  return (
    <div
      className="artist-result"
      onClick={() => {
        dispatch(setSong({}));
        spotify.getArtistDetails(user, dispatch, artist)
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {artist.images.length > 2 ? (
        <img className="artist-result-img" src={artist.images[2].url} />
      ) : (
        <div
          className="artist-result-img"
          style={{ backgroundColor: "DimGray" }}
        ></div>
      )}

      <div className="artist-result-text">
        <div className="artist-result-name">{artist.name}</div>
      </div>
    </div>
  );
};

export default ArtistResult;
