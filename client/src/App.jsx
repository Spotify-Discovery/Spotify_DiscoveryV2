import React from 'react';
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import WebPlayer from './components/WebPlayer.jsx'
import spotify from './helpers/spotify'
import { useSelector, useDispatch } from 'react-redux';
import { setToken, setUserData, setTopTracks, setTopArtist } from './slices/userSlice'
import { setView } from './slices/viewSlice';

import { playSong, pauseSong } from './slices/songPreviewSlice';
const {useState, useEffect} = React;

const App = () => {
  // const mediaPlayer = new Audio();
  // mediaPlayer.volume = 0.5;

  const params = new URLSearchParams(window.location.search);
  const access_token = params.get('access_token');
  const refresh_token = params.get('refresh_token');

  const previewSong = useSelector((state) => state.previewSong)
  const view = useSelector((state) => state.view);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // run useEffect to gather initial data and store it with redux
  useEffect(() => {
    if (access_token && refresh_token) {
      dispatch(setToken({access_token: access_token, refresh_token: refresh_token}));

      dispatch(setView('Home'));

      // spotify.getTopTracks(access_token)
      //   .then((res) => {
      //     dispatch(setTopTracks({topTracks: res}));
      //   });

      // spotify.getTopArtists(access_token)
      //   .then((res) => {
      //     dispatch(setTopArtists({topArtists: res}))
      //   });

      spotify.getUserData(access_token)
        .then((res) => {
          console.log('userdata', res)
          dispatch(setUserData({
            username: res.display_name,
            email: res.email,
            user_id: res.id,
            market: res.country,
            product: res.product
          }))
        })

    }
  }, []);

  useEffect(() => {
    console.log('in useeffect')
    if (previewSong.songUrl) {
      console.log('playing')
      dispatch(playSong());
    } else {

      dispatch(pauseSong());
    }

  }, [previewSong.songUrl])

  /**
   *
   */
  const renderView = () => {
    switch (view.currentView) {
      case 'Login':
        return <Login />;
      case 'Home':
        return (
          <>
            <Home />
            <WebPlayer />
          </>
        )
      default:
        return <div>404</div>;
    }
  }

  const renderedView = renderView();

  return (
    <main>
      {renderView()}
    </main>
  );
}

export default App;