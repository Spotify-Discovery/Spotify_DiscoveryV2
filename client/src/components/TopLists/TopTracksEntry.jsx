import React from 'react';

const TopTracksEntry = ({ track }) => {
  const containerStyle = {
    backgroundImage: `url(${track.album.images[1].url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }

  return (
    <div className="top-entry" style={containerStyle}>
      <div className="black-filter"></div>
      <div className="item-info">
        <div className="item-name">{track.name}</div>
        <div className="item-details">{track.artists[0].name}</div>
        <div className="item-popularity">{'Popularity ' + track.popularity}</div>
      </div>
    </div>
  )
}

export default TopTracksEntry;