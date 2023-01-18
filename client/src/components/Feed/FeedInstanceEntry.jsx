import React from 'react';

const FeedInstanceEntry = ({ element }) => {

  return (
    <div className="mini-albumart"
      style={
        {backgroundImage: `url(${element.album.images[1].url})`}
      }
    >

    </div>
  )
}

export default FeedInstanceEntry;