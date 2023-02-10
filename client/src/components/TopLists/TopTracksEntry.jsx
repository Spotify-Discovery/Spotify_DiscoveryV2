import React from "react";
import spotify from "../../helpers/spotify.js";
import { useSelector, useDispatch } from "react-redux";
import { setSong } from "../../slices/songPreviewSlice.js";
import { motion } from "framer-motion"

const { useRef, useEffect, useState } = React;

const TopTracksEntry = ({ track }) => {
  const previewSong = useSelector((state) => state.previewSong);
  const user = useSelector((state) => state.user);
  const recommendations = useSelector((state) => state.recommendations);
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const elemRef = useRef();

  const containerStyle = {
    backgroundImage: `url(${track.album.images[1].url})`,
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;',
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const handleMouseEnter = () => {
    console.log('REF', elemRef)
    dispatch(setSong(track));
  };

  const handleMouseLeave = () => {
    dispatch(setSong({}));
  };


  const getAnimation = () => {
    if (isHovered && elemRef.current.clientWidth >= 165) {
      return { x: [0, -elemRef.current.clientWidth + 155, 0] }
    } else {
      return {}
    }
  }

  const getTransition = (width) => {
    return {
    duration: width / 10,
    ease: 'linear'
    }
  }

  return (
    <div className="top-entry-container">
      <div
        className="top-entry"

        onContextMenu={(e) => {
          e.preventDefault();
          console.log('right click', track.name)
        }}

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
        <motion.div className="item-name-container" data-is-hovered={isHovered}>
          <div className="shadow-scroll"></div>
            <motion.div
              ref={elemRef}
              className="item-name"
              animate={getAnimation}
              transition={{
                duration: elemRef.current && isHovered ?
                (elemRef.current.clientWidth - 165) / 10 : 0,
                ease: 'linear',
                delay: 0.3

              }}
              >
                {track.name}
            </motion.div>
        </motion.div>
        <div className="item-details">{track.artists[0].name}</div>
        <div className="item-popularity">{'Popularity ' + track.popularity}</div>
      </div>
    </div>
  );
};

export default TopTracksEntry;
