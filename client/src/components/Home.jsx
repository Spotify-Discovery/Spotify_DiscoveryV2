import React from 'react'
import CardCarousel from './CardCarousel.jsx'

import RelatedTracksInstance from './Feed/RelatedTracksInstance.jsx'
import ArtistDetailsInstance from './Feed/ArtistDetailsInstance.jsx'
import { useSelector, useDispatch } from 'react-redux';
import spotify from '../helpers/spotify';

const {useRef, useState, useEffect} = React;

const Home = ({handleSearch, handleViewChange}) => {
  const [currentList, setCurrentList] = useState('ARTISTS');
  const user = useSelector((state) => state.user);
  const previewSong = useSelector((state) => state.previewSong);
  const recommendations = useSelector((state) => state.recommendations);
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

      <CardCarousel type={currentList}/>

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