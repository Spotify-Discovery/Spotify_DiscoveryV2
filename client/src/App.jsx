import React from 'react';
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import spotify from './helpers/spotify'
import { useSelector, useDispatch } from 'react-redux';
import { setToken, setUserData, setTopTracks, setTopArtists } from './slices/userSlice'
const {useState, useEffect} = React;

const App = (props) => {
  const [view, setView] = useState('Login');
  const params = new URLSearchParams(window.location.search);
  const access_token = params.get('access_token');
  const refresh_token = params.get('refresh_token');

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();

  // run useEffect to gather initial data and store it with redux
  useEffect(() => {
    if (access_token && refresh_token) {
      dispatch(setToken({access_token: access_token, refresh_token: refresh_token}));

      setView('Home');

      spotify.getTopTracks(access_token)
        .then((res) => {
          dispatch(setTopTracks({topTracks: res}))
        });

      spotify.getTopArtists(access_token)
        .then((res) => {
          dispatch(setTopArtists({topArtists: res}))
        });

    }
  }, []);

  useEffect(() => {
    console.log(user)
  }, [user]);

  /**
   *
   */
  const renderView = () => {
    switch (view) {
      case 'Login':
        return <Login />;
      case 'Home':
        return <Home />
      default:
        return <div>404</div>;
    }
  }

  const renderedView = renderView();

  return (
    <main>{renderView()}</main>
  );
}

export default App;