import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSong, toggleLoading } from "../slices/songPreviewSlice.js";
import { setContextMenuClicked, setContextMenuPosition, setContextMenuItem } from "../slices/contextMenuSlice.js";
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

  const isArtists = type === "topArtists";

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
      if (datum.preview_url) {
        dispatch(setSong(datum));
      } else {
        console.log('no preview url', datum.preview_url)
        spotify.getPreview(user, dispatch, datum)
        .then((data) => {
          dispatch(toggleLoading(false));
          dispatch(setSong({...datum, preview_url: data}));
        });
      }
    }
  };

  /**
   *
   */
  const handleMouseLeave = () => {
    dispatch(toggleLoading(false));
    dispatch(setSong({}));
  };

  const getAnimation = () => {
    if (isHovered && elemRef.current.clientWidth >= 165) {
      return { x: [0, -elemRef.current.clientWidth + 155, -elemRef.current.clientWidth + 155, 0] }
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
  
  if (name) {
    return (
      <div
        className="card-container"
  
        onContextMenu={(e) => {
          e.preventDefault();
          dispatch(setContextMenuItem({item: datum, type: isArtists ? 'artist' : 'track'}));
          dispatch(setContextMenuClicked(true));
          dispatch(setContextMenuPosition({ x: e.pageX, y: e.pageY }));
          console.log('right click', e.pageX, e.pageY);
        }}
  
        onMouseEnter={() => {
          setIsHovered(true)
          handleMouseEnter();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        onClick={() => {
          dispatch(setSong({}));
          if (isArtists) {
            spotify.getArtistDetails(user, dispatch, datum)
          } else {
            spotify.getRelated(user, dispatch, datum);
          }
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
            {(!isArtists && name.length > 19) && <div className="shadow-scroll"></div>}
            <motion.div
              ref={elemRef}
              className={`item-name ${isArtists ? "artist-name" : ""}`}
              animate={getAnimation}
              transition={{
                duration: elemRef.current && isHovered ?
                (elemRef.current.clientWidth - 165) / 10 : 0,
                ease: 'linear',
                repeat: Infinity,
                delay: 3,
                repeatDelay: 3
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
  }
};

export default Card;