import React from 'react';
const {useState, useEffect} = React;
import { useSelector, useDispatch } from 'react-redux';
import { setView } from '../slices/viewSlice';
import { setTracks, setArtists } from '../slices/searchResultsSlice';
import { setAutoPlayPreviews } from '../slices/userSlice';
import search from '../helpers/search.js';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [isSettings, setIsSettings] = useState(false);
  const user = useSelector((state) => state.user);
  const [speakerIcon, setSpeakerIcon] = useState(user.settings.autoPlayPreviews);
  const view = useSelector((state) => state.view);
  const dispatch = useDispatch();

  const handleSettingsClick = () => {
    setIsSettings(!isSettings);
  }

  const handleSetAutoPlayPreviews = () => {
    console.log(speakerIcon)
    setSpeakerIcon(!speakerIcon);
  }

  useEffect(() => {
    if (view.currentView !== 'SearchResults' && query.length > 0) {
      console.log('change')
      dispatch(setView('SearchResults'));
    } else if (view.currentView === 'SearchResults' && query.length === 0) {
      dispatch(setView('Home'));
    } else {
      console.log(view)
    }

    let cancel = false;

    const handleQueryChange = async () => {
      let result = !query ? {tracks: {items: []}, artists: {items:[]}} : await search.fromQuery(user, dispatch, query);
      if (cancel) return;
      console.log(result);
      dispatch(setTracks(result.tracks.items));
      dispatch(setArtists(result.artists.items));
    }

    handleQueryChange();

    return () => cancel = true;

  }, [query]);

  useEffect(() => {
    dispatch(setAutoPlayPreviews(speakerIcon));
    console.log(user.settings.autoPlayPreviews)
  }, [speakerIcon]);

  const handleLogoutClick = () => {
    dispatch(setToken(null));
    localStorage.removeItem('refresh_token');
  }
// fa-solid fa-volume-xmark
  return (
    <>
      <div className="nav-container">
        <div className="title-home">Discover<span id="spotify-title">Spotify</span></div>

        <div className="nav-search-logout">
          <input autocomplete="off" id="search-bar" placeholder="Search Artists or Songs..." value={query} onChange={e => setQuery(e.target.value)}></input>
          {/* <button id="search-button" className="fa-solid fa-magnifying-glass fa-lg" type="submit"></button> */}
          <i id="settings-hamburger" className="fa-solid fa-bars fa-2xl" onClick={handleSettingsClick}/>
        </div>
      </div>
      {isSettings &&
      <div className="settings-dropdown">
        <i className={speakerIcon ? "fa-solid fa-volume-high" : "fa-solid fa-volume-xmark"} onClick={handleSetAutoPlayPreviews}></i>
        <a href="#about">About</a>
        <a href="#logout">Logout</a>
      </div>}
    </>
  )
}

export default Navbar;