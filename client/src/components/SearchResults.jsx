import React from 'react';
const {useState, useEffect} = React;
import { useSelector, useDispatch } from 'react-redux';
import { setView } from '../slices/viewSlice';

const SearchResults = () => {
  const searchResults = useSelector((state) => state.searchResults);

  const renderTracks = () => {
    return searchResults.tracks.map((track, index) => {
      return (
        <div key={index}>
          <img src={track.album.images[0].url} />
          <div>{track.name}</div>
          <div>{track.artists[0].name}</div>
        </div>
      )
    })
  }

  const renderArtists = () => {
    return searchResults.artists.map((artist, index) => {
      return (
        <div key={index}>
          <img src={artist.images[0] ? artist.images[0].url : null} />
          <div>{artist.name}</div>
        </div>
      )
    })
  }

  return (
    <div>
      <h1>Tracks</h1>
      {renderTracks()}
      <h1>Artists</h1>
      {renderArtists()}
    </div>
  )
}

export default SearchResults;
