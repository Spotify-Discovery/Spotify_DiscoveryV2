import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSong } from "../../slices/songPreviewSlice.js";
import spotify from "../../helpers/spotify.js";

const TopArtistsEntry = ({ artist }) => {
  const previewSong = useSelector((state) => state.previewSong);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const containerStyle = {
    backgroundImage: `url(${artist.images[1]?.url})`,
    borderRadius: "50%",
    border: "none",
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const handleMouseEnter = () => {
    dispatch(setSong(artist.track));
  };

  const handleMouseLeave = () => {
    dispatch(setSong({}));
  };

  return (
    <div
      className="top-entry-container"

      onMouseEnter={() => {
        handleMouseEnter();
      }}
      onMouseLeave={() => {
        handleMouseLeave();
      }}
      onClick={() => {
        dispatch(setSong({}));
        spotify.getArtistDetails(user, dispatch, artist);
      }}
    >
      <a>
        <div className="top-entry" style={containerStyle}>
          <div className="black-filter"></div>
        </div>
      </a>
      <div className="item-info">
        <div className="item-name artist-name">{artist.name}</div>
        <div className="item-details">{artist.genres[0]}</div>
        <div className="item-popularity">
          {"Popularity " + artist.popularity}
        </div>
      </div>
    </div>
  );
};

export default TopArtistsEntry;

// const pictureStyle = {
//   backgroundImage: `url(${artist.images[2].url})`,
//   height: '150px',
//   width: '150px',
//   backgroundSize: 'cover',
//   backgroundRepeat: 'no-repeat',
//   borderRadius: '20px'
// }
