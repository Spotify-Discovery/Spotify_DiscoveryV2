//react component for each album instance
import React from "react";
import AlbumTrackEntry from "./AlbumTrackEntry.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { setSong } from '../../slices/songPreviewSlice.js';


const AlbumInstance = ({ instance }) => {
  return (
    <div className="feed-instance-container" style={{ marginTop: "20px" }}>
      <div className="album-instance-wrapper">
        <div className="artwork-name-container">
          <img
            className="album-instance-artwork"
            src={instance.album.images[0].url}
          />
          <div className="album-info">
            <div className="album-name">{instance.album.name}</div>
            <div className="album-artist">
              {instance.album.artists.map((artist, i) => {
                let lastIndex = instance.album.artists.length - 1;
                if (i === lastIndex) {
                  return `${artist.name}`;
                } else if (i + 1 === lastIndex) {
                  return `${artist.name} & `;
                } else {
                  return `${artist.name}, `;
                }
              })}
            </div>
          </div>
        </div>
        <div className="album-tracks">
          {instance.tracks.map((track, i) => {
            return <AlbumTrackEntry track={track} key={i} album={instance.album} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AlbumInstance;
