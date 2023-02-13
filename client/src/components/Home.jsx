import React from 'react'
import CardCarousel from './CardCarousel.jsx'
import FeedInstanceEntry from './Feed/FeedInstanceEntry.jsx'
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
              <img className="now-playing-image" src={previewSong.song.album.images[0].url}></img>
            </div>

            <div className="caption-track-name">
              {previewSong.song.name}
            </div>

            <div className="caption-artists">
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
            return (
              <div>
                <div className="rec-head-container">
                  <div className="rec-to-art"
                    style={{backgroundImage: `url(${instance.relatedTo.album.images[1].url})`}}>
                  </div>

                  <div className="rec-text-container">
                    <div className="rec-songinfo">
                      <div className="recommended-header">{instance.relatedTo.name}</div>

                      <div>
                        <div className="rec-artistname">
                          {instance.relatedTo.artists.map((artist, i) => {
                            let lastIndex = instance.relatedTo.artists.length - 1;
                            if (i === lastIndex) {
                              return `${artist.name}`;
                            } else {
                              return `${artist.name}, `
                            }
                          })}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      color: '#1DB954',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}>
                      Recommended:
                    </div>
                  </div>
                </div>
                <div className="feed-instance-container">
                  <div className="feed-instance">
                    {instance.relatedTracks.map((element) => {
                      return <FeedInstanceEntry element={element}/>
                    })}
                  </div>
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