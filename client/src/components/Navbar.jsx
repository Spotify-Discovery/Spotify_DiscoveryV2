import React from 'react';
const {useState, useEffect} = React;
import { useSelector, useDispatch } from 'react-redux';
import { setView } from '../slices/viewSlice';
import { setTracks, setArtists } from '../slices/searchResultsSlice';
import search from '../helpers/search.js';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const user = useSelector((state) => state.user);
  const view = useSelector((state) => state.view);
  const dispatch = useDispatch();

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

  return (
    <div className="head-container">
      <div className="title-home">Discover<span id="spotify-title">Spotify</span></div>
      <div className="nav-container">
      <form onSubmit={()=>{}} autoComplete="off">
        <input id="search" placeholder="Search Artists or Songs..." value={query} onChange={e => setQuery(e.target.value)}></input>
        <button id="search-button" className="fa-solid fa-magnifying-glass fa-lg" type="submit"></button>
      </form>
    </div>
    </div>
  )
}

export default Navbar;