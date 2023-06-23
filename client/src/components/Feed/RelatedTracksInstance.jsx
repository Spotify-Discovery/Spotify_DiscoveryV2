import React from "react";
import FeedInstanceEntry from "./FeedInstanceEntry.jsx";
import spotify from "../../helpers/spotify.js";
import { useSelector, useDispatch } from "react-redux";

const RelatedTracksInstance = ({ instance }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div>
      <div className="rec-head-container">
        <div className="feed-buttons">
          <div className="open-spotify-button">
            <a title="Open in Spotify" target="_blank" href={instance.relatedTo.external_urls.spotify}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 700 700"
                space="preserve"
                className="open-icon icon-svg"
              >
                <path d="M660.6 211.1V68L353 375.6 324.4 347 632 39.4H488.9V0H700v211.1h-39.4zM700 556.9V362.5h-39.4v193.2c0 57.2-46.5 104.9-104.9 104.9H144.3c-57.2 0-104.9-46.5-104.9-104.9V144.3c0-57.2 46.5-104.9 104.9-104.9h192V0h-192C64.4 0 0 64.4 0 144.3v411.4C0 635.6 64.4 700 144.3 700h411.4c79.9 0 144.3-64.4 144.3-143.1z" />
              </svg>
            </a>
          </div>
          <div className="open-spotify-button"
            title="Create Playlist"
            onClick={() => {
              spotify.createPlaylist(user, dispatch, instance.relatedTracks, instance.relatedTo.name)
            }}
          >
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0"
              y="0"
              viewBox="0 0 700 634.9"
              space="preserve"
              className="create-playlist-icon icon-svg"
            >
              <style></style>
              <path
                className="st0"
                d="M26.5 0C12.1-.1.4 11.5.4 25.9v181.3c0 21 23.6 33.2 40.8 21.2l129.5-90.6c14.7-10.3 14.7-32.1 0-42.4L41.1 4.7C36.8 1.7 31.8.1 26.5 0zM259.4 90.6c-6.9-.1-13.6 2.6-18.6 7.5-4.9 4.9-7.7 11.5-7.7 18.4 0 6.9 2.8 13.6 7.7 18.4 4.9 4.9 11.6 7.6 18.6 7.5h388.5c6.9.1 13.6-2.6 18.6-7.5 4.9-4.9 7.7-11.5 7.7-18.4 0-6.9-2.8-13.6-7.7-18.4-4.9-4.9-11.6-7.6-18.6-7.5H259.4zM26.3 297.8c-6.9-.1-13.6 2.6-18.6 7.5-4.9 4.9-7.7 11.5-7.7 18.4s2.8 13.6 7.7 18.4c4.9 4.9 11.6 7.6 18.6 7.5h621.6c6.9.1 13.6-2.6 18.6-7.5 4.9-4.9 7.7-11.5 7.7-18.4s-2.8-13.6-7.7-18.4c-4.9-4.9-11.6-7.6-18.6-7.5H26.3zM26.3 505c-6.9-.1-13.6 2.6-18.6 7.5C2.8 517.3 0 524 0 530.9c0 6.9 2.8 13.6 7.7 18.4 4.9 4.9 11.6 7.6 18.6 7.5h388.5c6.9.1 13.6-2.6 18.6-7.5 4.9-4.9 7.7-11.5 7.7-18.4 0-6.9-2.8-13.6-7.7-18.4-4.9-4.9-11.6-7.6-18.6-7.5H26.3zM596.4 427c-7-.1-13.7 2.6-18.7 7.6-5 4.9-7.7 11.7-7.6 18.7V505h-51.8c-6.9-.1-13.6 2.6-18.6 7.5-4.9 4.9-7.7 11.5-7.7 18.4 0 6.9 2.8 13.6 7.7 18.4 4.9 4.9 11.6 7.6 18.6 7.5h51.8v51.8c-.1 6.9 2.5 13.5 7.3 18.4 4.8 4.9 11.3 7.7 18.2 7.9 7 .1 13.7-2.6 18.7-7.6 5-4.9 7.7-11.7 7.6-18.7v-51.8h51.8c6.9.1 13.6-2.6 18.6-7.5 4.9-4.9 7.7-11.5 7.7-18.4 0-6.9-2.8-13.6-7.7-18.4-4.9-4.9-11.6-7.5-18.6-7.5h-51.8v-51.8c.1-6.9-2.5-13.5-7.3-18.4-4.8-4.9-11.3-7.7-18.2-7.8z"
              />
            </svg>
          </div>
        </div>
        <div
          className="rec-to-art"
          style={{
            backgroundImage: `url(${instance.relatedTo.album.images[1].url})`,
          }}
        ></div>

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
                    return `${artist.name}, `;
                  }
                })}
              </div>
            </div>
          </div>

          <div
            className="recommended-text"
            style={{
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Recommended:
          </div>
        </div>
      </div>
      <div className="feed-instance-container">
        <div className="feed-instance">
          {instance.relatedTracks.map((element, i) => {
            return <FeedInstanceEntry element={element} key={i}/>;
          })}
        </div>
      </div>
    </div>
  );
};

export default RelatedTracksInstance;
