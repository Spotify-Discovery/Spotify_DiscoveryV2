import React from 'react';
const {useState, useEffect} = React;

const TrackResult = ({ track }) => {
  return (
    <div className="track-result">
      <img className="track-result-img"
        src={track.album.images[0].url}/>

      <div className="track-result-text">
        <div className="track-result-name">{track.name}</div>
        <div className="track-result-artist">{track.artists[0].name}</div>
      </div>
    </div>
  )
}

export default TrackResult;