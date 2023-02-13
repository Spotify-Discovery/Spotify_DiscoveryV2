import React from 'react';
import TopTracksEntry from "./TopTracksEntry.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { setTopTracks } from '../../slices/userSlice'
import spotify from '../../helpers/spotify'

const {useState, useEffect} = React;

const TopTracksList = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [timeRange, setTimeRange] = useState('short_term');
  const [currentIndex, setCurrentIndex] = useState(0);

  let maxIndex = Math.floor(user.topTracks.length / 3);
  if (maxIndex === 1) {
    maxIndex = 0;
  }

  useEffect(() => {
    dispatch(setTopTracks({topTracks: []}));
    spotify.getTopTracks(user, dispatch, timeRange)
    setCurrentIndex(0);

  }, [timeRange]);

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

  const getTimeRangeStyle = (time) => {
    if (timeRange === time) {
      return (
        {opacity: 1}
      )
    }
  }

  return (
    <div>

      <div className="header-container">
        <div
          className="time-range"
          style={getTimeRangeStyle('short_term')}
          onClick={() => {setTimeRange('short_term')}}>
            Last Month
        </div>
        <div
          className="time-range"
          style={getTimeRangeStyle('medium_term')}
          onClick={() => {setTimeRange('medium_term')}}>
            Last 6 Months
        </div>
        <div
          className="time-range"
          style={getTimeRangeStyle('long_term')}
          onClick={() => {setTimeRange('long_term')}}>
            All Time
        </div>

      </div>

      {user.topTracks.length > 0 &&
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
          {user.topTracks.map((track, i) => {
            return <TopTracksEntry track={track} key={i}/>
          })}
        </div>
      </div> || <div className="loading"/>}
    </div>
  )
}

export default TopTracksList;