import React from 'react';
const {useState, useEffect} = React;

const ArtistResult = ({ artist }) => {
  return (
    <div className="artist-result">
      <img className="artist-result-img"
        src={artist.album.images[0].url}/>

      <div className="artist-result-text">
        <div className="artist-result-name">{artist.name}</div>
      </div>
    </div>
  )
}

export default ArtistResult;