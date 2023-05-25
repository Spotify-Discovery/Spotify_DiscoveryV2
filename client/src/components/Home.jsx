import React from 'react'
import CardCarousel from './CardCarousel.jsx'
import SearchResults from './SearchResults.jsx';
import RelatedTracksInstance from './Feed/RelatedTracksInstance.jsx';
import ArtistDetailsInstance from './Feed/ArtistDetailsInstance.jsx';
import AlbumInstance from './Feed/AlbumInstance.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setTracks, setArtists } from '../slices/searchResultsSlice';
import spotify from '../helpers/spotify';
import search from "../helpers/search.js";
import HistoryContainer from './History/HistoryContainer.jsx';

const {useRef, useState, useEffect} = React;

const Home = ({handleSearch, handleViewChange}) => {
  const [currentList, setCurrentList] = useState('topArtists');
  const [query, setQuery] = useState('');
  const user = useSelector((state) => state.user);
  const previewSong = useSelector((state) => state.previewSong);
  const recommendations = useSelector((state) => state.recommendations);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentList !== 'SEARCH' && query.length > 0) {
      setCurrentList('SEARCH');
    } else if (currentList === 'SEARCH' && query.length === 0) {
      setCurrentList('topArtists');
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

  const getHeaderStyle = (listName) => {
    if (currentList === listName) {
      return (
        {
          opacity: 1,
          color: '#F96D00',
        }
      )
    }
  }

  const renderList = () => {
    switch (currentList) {
      case 'ARTISTS':
        return <TopArtistsList />
      case 'TRACKS':
        return <TopTracksList />
      case 'SEATCH':
        return <SearchResults />
      default:
        return <div>404</div>;
    }
  }

  // Get user data from access token on initial render
  useEffect(() => {
    spotify.getUserData(user, dispatch);

  }, []);

  useEffect(() => {
    console.log('currentlist', currentList);
  }, [currentList]);

  
  return (
    <div className="" id="main-column">
      <div id="mainColumnInner">
        {previewSong.song?.preview_url &&
          <div id="artwork">
            <div id="artworkImg">
              <img class="now-playing-image" src={previewSong.song.album.images[0].url}></img>
            </div>

            <div className="caption-track-name">
              {previewSong.song.name}
            </div>

            <div class="caption-artists">
              {previewSong.song.artists.map((artist, i) => {
                let lastIndex = previewSong.song.artists.length - 1;
                if (i === lastIndex) {
                  return `${artist.name}`;
                } else if (i+1 === lastIndex) {
                  return `${artist.name} & `
                } else {
                  return `${artist.name}, `
                }
              })}
            </div>
          </div>
        }
        <HistoryContainer />
        <div className="header-container">
          <div className={`top-header ${currentList === 'topArtists' ? 'focused' : ''}`}
            onClick={() => {setCurrentList('topArtists')}}
            >Top Artists</div>
          <div className={`top-header ${currentList === 'topTracks' ? 'focused' : ''}`}
            onClick={() => {setCurrentList('topTracks')}}
            >
            Top Tracks</div>
          </div>
          <input
            autoComplete="off"
            id="search-bar"
            placeholder="Search Artists or Songs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>

      {currentList !== 'SEARCH' ? <CardCarousel type={currentList}/> : <SearchResults />}

        <div className="feed">
          {recommendations.isLoading && <div class="loading"/>}
          {recommendations.feed.map((instance) => {
            switch(instance.type) {
              case 'TRACKS':
                return <RelatedTracksInstance instance={instance}/>
                break;
              case 'ARTIST':
                return <ArtistDetailsInstance instance={instance}/>
                break;
              case 'ALBUM':
                return <AlbumInstance instance={instance} />
                break;
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;