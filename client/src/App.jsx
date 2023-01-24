import React from 'react';
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import WebPlayer from './components/WebPlayer.jsx'
import Navbar from './components/Navbar.jsx'
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

  const previewSong = useSelector((state) => state.previewSong)
  const view = useSelector((state) => state.view);
  const user = useSelector((state) => state.user);
  const access_token = useSelector((state) => state.user.access_token);
  const refresh_token = useSelector((state) => state.user.refresh_token);

  const dispatch = useDispatch();

  // run useEffect to gather initial data and store it with redux
  useEffect(() => {
    if (params.get('access_token') && params.get('refresh_token')) {
      dispatch(setToken({access_token: params.get('access_token'), refresh_token: params.get('refresh_token')}));
      dispatch(setView('Home'));

      // Remove access and refresh tokens from URL params
      window.history.pushState({}, document.title, (window.location.href.split(window.location.host)[1]).split("?")[0]);

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
        return <Home />
      default:
        return <div>404</div>;
    }
  }

  const renderedView = renderView();

  return !access_token ? <Login /> : (
    <main>
      <div className="center">
        <Navbar />
        {renderView()}
        <WebPlayer />
      </div>
    </main>
  );
}

export default App;