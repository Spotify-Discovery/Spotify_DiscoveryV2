import React from "react";
import Card from "./Card.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setTopArtists, setTopTracks } from "../slices/userSlice";
import spotify from "../helpers/spotify";

const { useState, useEffect } = React;

const CardCarousel = ({ type }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [timeRange, setTimeRange] = useState("short_term");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState(user[type]["short_term"]);

  const [maxIndex, setMaxIndex] = useState(Math.floor(20 / 3));
  /**
   * Dispatches the top artists to the store based on state's timeRange
   */
  const dispatchTopArtists = async () => {
    const getTopArtists = async () => {
      const topArtists = await spotify.getTopArtists(user, dispatch, timeRange);
    };
    
    getTopArtists().then(() => {
      setCurrentIndex(0);
      console.log("here", user.topArtists);
    });
  };

  /**
   * Dispatches the top tracks to the store based on state's timeRange
   */
  const dispatchTopTracks = async () => {
    const getTopTracks = async () => {
      const topTracks = await spotify.getTopTracks(user, dispatch, timeRange);
    };

    getTopTracks().then(() => {
      setCurrentIndex(0);
      console.log("here", user.topTracks)
    });
  };

  /**
   * When timeRange is changed (e.g. past month, past 6 months, all time), we dispatch the top artists or top tracks to the store
   */
  // useEffect(() => {
  //   if (type === 'ARTISTS') {
  //     dispatchTopArtists();
  //   } else if (type === 'TRACKS') {
  //     dispatchTopTracks();
  //     setData(user.topTracks);
  //   }
  // }, [timeRange, type]);

  // useEffect(() => {
  //   if (type === 'ARTISTS') {
  //     setData(user.topArtists);
  //   } else if (type === 'TRACKS') {
  //     console.log('setting data', user.topTracks)
  //     setData(user.topTracks);
  //   }
  // }, [type])

  useEffect(() => {
    console.log('maxIndex', maxIndex)
    if (type === "topArtists") {
      if (user.topArtists[timeRange].length === 0) {
        dispatchTopArtists();
      }
    } else if (type === "topTracks") {
      if (user.topTracks[timeRange].length === 0) {
        dispatchTopTracks();
      }
    }
  }, [type, timeRange]);

  useEffect(() => {
    console.log('type', type)
    console.log("data changed", data);
  }, [type, data]);
  /**
   * Click right arrow
   */
  const handleNavigateRight = () => {
    if (currentIndex === maxIndex) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  /**
   * Click left arrow
   */
  const handleNavigateLeft = () => {
    if (currentIndex === 0) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  /**
   *
   */
  const getTimeRangeStyle = (time) => {
    if (timeRange === time) {
      return { opacity: 1 };
    }
  };

  return (
    <div>
      <div className="time-range-container">
        <div
          className={`time-range ${
            timeRange === "short_term" ? "time-range-focused" : ""
          }`}
          onClick={() => {
            setTimeRange("short_term");
          }}
        >
          Last Month
        </div>
        <div
          className={`time-range ${
            timeRange === "medium_term" ? "time-range-focused" : ""
          }`}
          style={getTimeRangeStyle("medium_term")}
          onClick={() => {
            setTimeRange("medium_term");
          }}
        >
          Last 6 Months
        </div>
        <div
          className={`time-range ${
            timeRange === "long_term" ? "time-range-focused" : ""
          }`}
          style={getTimeRangeStyle("long_term")}
          onClick={() => {
            setTimeRange("long_term");
          }}
        >
          All Time
        </div>
      </div>

      {(user[type][timeRange].length > 0 && (
        <div className="cards-container">
          <div className="top-options">
            {currentIndex !== 0 && (
              <div className="gallery-leftPointer" onClick={handleNavigateLeft}>
                ‹
              </div>
            )}
            {currentIndex !== maxIndex && (
              <div
                className="gallery-rightPointer"
                onClick={handleNavigateRight}
              >
                ›
              </div>
            )}
          </div>
          <div
            className="top-inner-container"
            style={{
              transition: "transform 0.3s",
              transform: `translateX(-${currentIndex * 645}px)`,
            }}
          >
            {user[type][timeRange].map((datum, i) => {
              return <Card type={type} datum={datum} key={datum.id} />;
            })}
          </div>
        </div>
      )) || <div className="loading" />}
    </div>
  );
};

export default CardCarousel;
