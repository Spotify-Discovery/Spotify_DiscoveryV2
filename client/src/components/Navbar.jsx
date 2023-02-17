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
    setSpeakerIcon(!speakerIcon);
  }

  /**
   * Close settings dropdown when user clicks outside of it
   */
  useEffect(() => {
    const handleClick = (e) => {
      let isSettingsDropdown = false;
      let node = e.target;

      while (node.id !== 'root') {
        if (node.id === 'settings-dropdown' || node.id === 'settings-hamburger') {
          isSettingsDropdown = true;
        }
        node = node.parentNode;
      }

      if (!isSettingsDropdown) {
        setIsSettings(false);
      }

    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [])

  /**
   *
   */
  useEffect(() => {
    if (view.currentView !== 'SearchResults' && query.length > 0) {
      dispatch(setView('SearchResults'));
    } else if (view.currentView === 'SearchResults' && query.length === 0) {
      dispatch(setView('Home'));
    }

    let cancel = false;

    const handleQueryChange = async () => {
      let result = !query ? {tracks: {items: []}, artists: {items:[]}} : await search.fromQuery(user, dispatch, query);
      if (cancel) return;
      dispatch(setTracks(result.tracks.items));
      dispatch(setArtists(result.artists.items));
    }

    handleQueryChange();

    return () => cancel = true;

  }, [query]);

  /**
   *
   */
  useEffect(() => {
    dispatch(setAutoPlayPreviews(speakerIcon));
  }, [speakerIcon]);

  /**
   *
   */
  const handleLogoutClick = () => {
    dispatch(setToken(null));
    localStorage.removeItem('refresh_token');
  }

  return (
    <>
      <div className="nav-container">
        <div className="title-home">Discover<span id="spotify-title">Spotify</span></div>

        <div className="nav-search-logout">
          {/* <input autoComplete="off" id="search-bar" placeholder="Search Artists or Songs..." value={query} onChange={e => setQuery(e.target.value)}></input> */}
          <div></div>
          <i id="settings-hamburger" className="fa-solid fa-bars fa-2xl" onClick={handleSettingsClick}/>
        </div>
      </div>
      {isSettings &&
      <div id="settings-dropdown" className="settings-dropdown">
        <i className={speakerIcon ? "fa-solid fa-volume-high" : "fa-solid fa-volume-xmark"} onClick={handleSetAutoPlayPreviews}></i>
        <a href="#about">About</a>
        <a href="#logout">Logout</a>
      </div>}
    </>
  )
}

export default Navbar;