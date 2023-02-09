import React from "react";
import spotify from "../../helpers/spotify.js";
import { useSelector, useDispatch } from "react-redux";
import { setSong } from "../../slices/songPreviewSlice.js";

const { useRef, useEffect } = React;

const TopTracksEntry = ({ track }) => {
  const previewSong = useSelector((state) => state.previewSong);
  const user = useSelector((state) => state.user);
  const recommendations = useSelector((state) => state.recommendations);
  const dispatch = useDispatch();

  const elemRef = useRef();

  useEffect(() => {
    console.log('REF', elemRef)
  }, [elemRef])

  const containerStyle = {
    backgroundImage: `url(${track.album.images[1].url})`,
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;',
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const handleMouseEnter = () => {
    dispatch(setSong(track));
  };

  const handleMouseLeave = () => {
    dispatch(setSong({}));
  };

  return (
    <div className="top-entry-container">
      <div
        className="top-entry"
        style={containerStyle}
        onMouseEnter={() => {
          handleMouseEnter();
        }}
        onMouseLeave={() => {
          handleMouseLeave();
        }}
        onClick={() => {
          if (!recommendations.isLoading) {
            console.log('hereeeeeeeee',recommendations.isLoading)
            spotify.getRelated(user, dispatch, track)
          }
        }}
      >
        <div className="black-filter"></div>
      </div>
      <div className="item-info">
        <div className="item-name-container">
          <div className="shadow-scroll"></div>
            <div ref={elemRef} className="item-name">{track.name}</div>
        </div>
        <div className="item-details">{track.artists[0].name}</div>
        <div className="item-popularity">{'Popularity ' + track.popularity}</div>
      </div>
    </div>
  );
};

export default TopTracksEntry;
