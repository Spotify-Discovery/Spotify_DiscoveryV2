import React from 'react'
import Search from './Search.jsx'
import TopArtistsList from './TopLists/TopArtistList.jsx'
import TopTracksList from './TopLists/TopTracksList.jsx'
import FeedInstanceEntry from './Feed/FeedInstanceEntry.jsx'
// import WebPlayer from './WebPlayer.jsx'
import { useSelector } from 'react-redux';

const {useRef, useState} = React;

const Home = ({handleSearch, handleViewChange}) => {
  const searchRef = useRef('');
  const [firstSearch, setFirstSearch] = useState(true);
  const [currentList, setCurrentList] = useState('ARTISTS');
  const user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (firstSearch) {setFirstSearch(false)}
    if (searchRef.current.value !== '') {
      handleSearch(searchRef.current.value);
      handleViewChange('Search')
    }
  }

  const getHeaderStyle = (listName) => {
    if (currentList === listName) {
      return (
        {
          opacity: 1,
          color: '#1DB954',
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
      default:
        return <div>404</div>;
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
      <div>
        <div className="header-container">
          <div className="top-header"
            onClick={() => {setCurrentList('ARTISTS')}}
            style={getHeaderStyle('ARTISTS')}
            >Top Artists</div>
          <div className="top-header"
            onClick={() => {setCurrentList('TRACKS')}}
            style={getHeaderStyle('TRACKS')}>
            Top Tracks</div>
          </div>

        {renderList()}

        <div className="feed">
          {user.feed.map((instance) => {
            return (
              <div className="feed-instance-container">
                <div className="recommended-header">Recommendations based on "{instance.relatedTo}"</div>
                <div className="feed-instance">
                  {instance.relatedTracks.map((element) => {
                    return <FeedInstanceEntry element={element}/>
                  })}
                </div>
              </div>
            )
          })}

        </div>

      </div>
    </div>
  );
}

export default Home;