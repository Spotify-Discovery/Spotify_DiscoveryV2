import React from 'react';
const {useState, useRef} = React;

const Navbar = () => {

  return (
    <div className="head-container">
      <div className="title-home">Discover<span id="spotify-title">Spotify</span></div>
      <form onSubmit={() => {}} autoComplete="off">
        <input id="search" placeholder="Search..."></input>
        <button id="search-button" className="fa-solid fa-magnifying-glass fa-lg" type="submit"></button>
      </form>
    </div>
  )
}

export default Navbar;