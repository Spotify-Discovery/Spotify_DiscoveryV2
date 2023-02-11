import React from 'react';
const {useState, useEffect} = React;
import { useSelector, useDispatch } from 'react-redux';
import { setView } from '../slices/viewSlice';
import TrackResult from './TrackResult.jsx';
import TopArtistsEntry from './TopLists/TopArtistsEntry.jsx';

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
  }

  const handleLeftClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }

  const renderTracks = () => {
    return searchResults.tracks.map((track) => {
      return (
        <TrackResult track={track} key={track.id} />
      )
    })
  }

  const renderArtists = () => {
      return (
        <div className="cards-container">
        <div className="top-options">
          {currentIndex !== 0 &&
            <div className="gallery-leftPointer" onClick={handleLeftClick}>‹</div>
          }
          {currentIndex !== maxIndex &&
            <div className="gallery-rightPointer" onClick={handleRightClick}>›</div>
          }
        </div>
        <div className="top-inner-container"
          style={{
            transition: 'transform 0.3s',
            transform: `translateX(-${currentIndex * 645}px)`,
          }}>
          {searchResults.artists.map((artist, i) => {
            return <TopArtistsEntry artist={artist} key={i}/>
          })}
        </div>
      </div>
      )
  }

  return (
    <>
      {searchResults.tracks.length > 0 &&
        <div>
          <h1>Tracks</h1>
          {renderTracks()}
          <h1>Artists</h1>
          {renderArtists()}
        </div> || <div class="loading"/>}
    </>
  )
}

export default SearchResults;
