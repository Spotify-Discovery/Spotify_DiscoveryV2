import React from 'react';

const Login = () => {
  return (
    <div className="center">
      <div className="title">Rhyth<span id="spotify-title">monica</span></div>
      <a className="login-button"
        href={'./login'}>Login to Spotify</a>
    </div>
  );
}

export default Login;