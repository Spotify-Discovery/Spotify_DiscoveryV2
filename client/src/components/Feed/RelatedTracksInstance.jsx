import React from 'react';
import FeedInstanceEntry from './FeedInstanceEntry.jsx'

const RelatedTracksInstance = ({instance}) => {
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
}

export default RelatedTracksInstance;