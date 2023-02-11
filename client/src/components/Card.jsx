import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSong } from "../slices/songPreviewSlice.js";
import { setContextMenuClicked, setContextMenuPosition } from "../slices/contextMenuSlice.js";
import spotify from "../helpers/spotify.js";
import { motion } from "framer-motion"


const Card = ({ type, datum }) => {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [details, setDetails] = useState();
  const [popularity, setPopularity] = useState();
  const [preview_url, setPreview_url] = useState();
  const [isHovered, setIsHovered] = useState(false);

  const previewSong = useSelector((state) => state.previewSong);
  const user = useSelector((state) => state.user);
  const recommendations = useSelector((state) => state.recommendations);
  const dispatch = useDispatch();

  const isArtists = type === "ARTISTS";

  useEffect(() => {
    if (isArtists) {
      setImage(datum.images[1]);
      setName(datum.name);
      setDetails(datum.genres[0]);
      setPopularity(datum.popularity);
      setPreview_url(datum.track.preview_url);
    } else {
      setImage(datum.album.images[1]);
      setName(datum.name);
      setDetails(datum.artists[0].name);
      setPopularity(datum.popularity);
      setPreview_url(datum.preview_url);
    }
  }, [datum]);

  /**
   * Adds event listener to window so we can click outside of the menu to close it
   */
  useEffect(() => {
    const handleClick = () => dispatch(setContextMenuClicked(false));
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);


  const elemRef = useRef();

  /**
   *
   */
  const handleMouseEnter = () => {
    if (isArtists) {
      dispatch(setSong(datum.track));
    } else {
      dispatch(setSong(datum));
    }
  };

  /**
   *
   */
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
    <div
      className="card-container"

      onContextMenu={(e) => {
        e.preventDefault();
        dispatch(setContextMenuClicked(true));
        dispatch(setContextMenuPosition({ x: e.pageX, y: e.pageY }));
        console.log('right click', e.pageX, e.pageY);
      }}

      onMouseEnter={() => {
        setIsHovered(true);
        handleMouseEnter();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      onClick={() => {
        dispatch(setSong({}));
        // spotify.getArtistDetails(user, dispatch, datum);
      }}
      >

      <div
        className="card-background"
        style={{
          backgroundImage: `url(${image?.url})`,
          borderRadius: isArtists ? "50%" : "0%",
        }}
        >
        <div className="black-filter"></div>
      </div>

      <div className="item-info">
        <motion.div className="item-name-container" data-is-hovered={isHovered}>
          {!isArtists && <div className="shadow-scroll"></div>}
          <motion.div
            ref={elemRef}
            className={`item-name ${isArtists ? "artist-name" : ""}`}
            animate={getAnimation}
            transition={{
              duration: elemRef.current && isHovered ?
              (elemRef.current.clientWidth - 165) / 10 : 0,
              ease: 'linear',
              delay: 0.3
            }}
            >
            {name}
          </motion.div>
        </motion.div>
        <div className="item-details">{details}</div>
        <div className="item-popularity">
          Popularity {popularity}
        </div>
      </div>
    </div>
  );
};

export default Card;