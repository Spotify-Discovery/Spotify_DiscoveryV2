import React from "react";
import spotify from "../../helpers/spotify.js";
import { useSelector, useDispatch } from "react-redux";
import { setSong } from "../../slices/songPreviewSlice.js";

const FeedInstanceEntry = ({ track, album }) => {
  const user = useSelector((state) => state.user);
  const recommendations = useSelector((state) => state.recommendations);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    dispatch(setSong({ type: "FROM_ALBUM", track: track, album: album }));
  };

  const handleMouseLeave = () => {
    dispatch(setSong({}));
  };

  return (
    <div
      className="album-track-container"
      onMouseEnter={() => {
        handleMouseEnter();
      }}
      onMouseLeave={() => {
        handleMouseLeave();
      }}
      onClick={() => {
        console.log('req')
        if (!recommendations.isLoading) {
          spotify.getRelated(user, dispatch, track, album)
        }
      }}
    >
      <div className="album-track-entry">{track.name}</div>
    </div>
  );
};

export default FeedInstanceEntry;
