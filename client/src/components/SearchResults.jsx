import React from "react";
const { useState, useEffect } = React;
import { useSelector, useDispatch } from "react-redux";
import { setView } from "../slices/viewSlice";
import TrackResult from "./TrackResult.jsx";
import ArtistResult from "./ArtistResult.jsx";
import TopArtistsEntry from "./TopLists/TopArtistsEntry.jsx";

const SearchResults = () => {
  const searchResults = useSelector((state) => state.searchResults);

  const [currentIndex, setCurrentIndex] = useState(0);

  let maxIndex = Math.floor(searchResults.artists.length / 3);
  if (maxIndex === 1) {
    maxIndex = 0;
  }

  const handleRightClick = () => {
    if (currentIndex === maxIndex) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleLeftClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderTracks = () => {
    return searchResults.tracks.map((track, i) => {
      return <TrackResult track={track} key={i} />;
    });
  };

  const renderArtists = () => {
    return searchResults.artists.map((artist, i) => {
      return <ArtistResult artist={artist} key={i} />;
    });
  };

  return (
    <>
      {(searchResults && (
        <div className="search-container">
          {searchResults.tracks.length > 0 && (
            <div>
              <div className="feed-subheaders">
                <div className="sub-head-text">Tracks</div>
              </div>
              <div className="search-results-container">{renderTracks()}</div>
            </div>
          )}
          {searchResults.artists.length > 0 && (
            <div>
              <div className="feed-subheaders">
                <div className="sub-head-text">Artists</div>
              </div>
              <div className="search-results-container">{renderArtists()}</div>
            </div>
          )}
        </div>
      )) || <div class="loading" />}
    </>
  );
};

export default SearchResults;
