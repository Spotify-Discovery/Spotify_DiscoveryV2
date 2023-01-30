import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import webPlayback from '../helpers/webPlayback.js';

function WebPlayer({ track }) {
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);

  const access_token = useSelector((state) => state.user.access_token);
  const refresh_token = useSelector((state) => state.user.refresh_token);

  // Our hooks wrapped in non-hook functions to be used as callbacks
  const handlers = {
    setPlayer: (player) => {
      setPlayer(player);
    },

    setTrack: (player) => {
      setTrack(player);
    },

    setActive: (player) => {
      setActive(player);
    },

    setPaused: (player) => {
      setPaused(player);
    },

  }

  // Create a device and then connect to it using Spotify's Webplayer SDK
  useEffect(() => {
    webPlayback.createAndConnectDevice(
      handlers.setPlayer,
      handlers.setPaused,
      handlers.setActive,
      handlers.setTrack
    );
  }, []);

  if (!is_active || !current_track) {
    return (
      <div></div>
    )
  } else {
    return (
      <div className="player-wrapper">
        <div className="track-wrapper">
          <div className="track-info">
            <div className="image-container">
              <img
                src={current_track.album.images[0].url}
                style={{
                  height: '64px',
                  width: '64px',
                }}
              />
            </div>
            <div className="track-and-artist">
              <b className="track-name">
                {current_track.name}
              </b>
              <a className="artist-name">
                {current_track.artists[0].name}
              </a>
            </div>
          </div>
        </div>
        <div className="webplayer-buttons-wrapper">
          <div className="webplayer-buttons-container">
            <div className="fa-solid fa-backward" onClick={() => { player.previousTrack() }}/>

            <div className={is_paused ? "fa-solid fa-play" : "fa-solid fa-pause"} onClick={() => {player.togglePlay()}}/>

            <div className="fa-solid fa-forward" onClick={() => { player.nextTrack() }}/>
          </div>
        </div>
        <div className="webplayer-hamburger">
          <div></div>
        </div>
      </div>
    );
  }
}

export default WebPlayer;