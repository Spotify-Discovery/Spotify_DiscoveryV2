import React from 'react'
import TopArtistsList from './TopLists/TopArtistList.jsx'
import TopTracksList from './TopLists/TopTracksList.jsx'
import FeedInstanceEntry from './Feed/FeedInstanceEntry.jsx'
import { useSelector, useDispatch } from 'react-redux';
import spotify from '../helpers/spotify';

const {useRef, useState, useEffect} = React;

const Home = ({handleSearch, handleViewChange}) => {
  const [currentList, setCurrentList] = useState('ARTISTS');
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

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

  // Get user data from access token on initial render
  useEffect(() => {
    spotify.getUserData(user, dispatch);
  }, []);

  //
  useEffect(() => {
    console.log(user)
  }, [user])


  return (
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
  );
}

export default Home;