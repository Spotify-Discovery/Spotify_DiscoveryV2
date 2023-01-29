import React from 'react';
import TopArtistsEntry from "./TopArtistsEntry.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { setTopArtists } from '../../slices/userSlice'
import spotify from '../../helpers/spotify'

const {useState, useEffect} = React;

const TopArtistsList = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [timeRange, setTimeRange] = useState('short_term');
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log('user.topArtists', user.topArtists)
  let maxIndex = Math.floor(user.topArtists.length / 3);
  if (maxIndex === 1) {
    maxIndex = 0;
  }

  useEffect(() => {
    const getTopArtists = async () => {
      const topArtists = await spotify.getTopArtists(user, dispatch, timeRange);
    }

    getTopArtists()
      .then(() => {
        setCurrentIndex(0);
      });
    // spotify.getTopArtists(user, dispatch, timeRange)
    // setCurrentIndex(0);
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

      {user.topArtists &&
      <div className="top-artists-container">
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
          {user.topArtists.map((artist, i) => {
            return <TopArtistsEntry artist={artist} key={i}/>
          })}
        </div>
      </div>}
    </div>
  )
}

export default TopArtistsList;