import React from 'react'
import Search from './Search.jsx'
import TopArtistsEntry from './TopLists/TopArtistsEntry.jsx'
import { useSelector } from 'react-redux';

const {useRef, useState} = React;

const Home = ({handleSearch, handleViewChange}) => {
  const searchRef = useRef('');
  const [firstSearch, setFirstSearch] = useState(true);
  const user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (firstSearch) {setFirstSearch(false)}
    if (searchRef.current.value !== '') {
      handleSearch(searchRef.current.value);
      handleViewChange('Search')
    }
  }

  return (
    <div className="center">
      <div className="head-container">
        <div className="title-home">Discover<span id="spotify-title">Spotify</span></div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <input ref={searchRef} id="search" placeholder="Search..."></input>
          <button id="search-button" className="fa-solid fa-magnifying-glass fa-lg" type="submit"></button>
        </form>
      </div>

      <div className="top-artists-container">
        {user.topArtists.map((artist) => {
          return <TopArtistsEntry artist={artist}/>
        })}
      </div>

    </div>
  );
}

export default Home;