import React from "react";
import FeedInstanceEntry from "../Feed/FeedInstanceEntry.jsx";
import { useSelector, useDispatch } from "react-redux";
import { clearHistory } from "../../slices/userSlice.js";
import spotify from "../../helpers/spotify.js";

const HistoryContainer = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return user.history.length > 0 ? (
    <div id="history">
      <div className="recommended-header">History</div>
      <div className="history-container">
        <div className="history-content-wrap">
          {user.history.map((item, i) => {
            return <FeedInstanceEntry element={item} key={i} />;
          })}
        </div>
      </div>
      <div
        className="history-create-playlist"
        onClick={() => {
          spotify.createPlaylist(
            user,
            dispatch,
            user.history,
            "Rythmonica History"
          );
        }}
        title="Create Playlist"
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
      <div
        id="clear-history-button"
        className="history-create-playlist"
        title="Clear History"
        onClick={() => {
          dispatch(clearHistory());
        }}
      >
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 32 32"
          space="preserve"
          className="create-playlist-icon icon-svg"
        >
          <style></style>
          <path
            className="st0"
            d="M13.3,0c-0.7,0-1.4,0.2-1.9,0.8c-0.5,0.5-0.8,1.2-0.8,1.9V4h-8v2.7H4V28c0,2.2,1.8,4,4,4h16c2.2,0,4-1.8,4-4
	V6.7h1.3V4h-8V2.7c0-0.7-0.2-1.4-0.8-1.9C20.1,0.2,19.4,0,18.7,0H13.3z M13.3,2.7h5.3V4h-5.3V2.7z M6.7,6.7h18.7V28
	c0,0.7-0.6,1.3-1.3,1.3H8c-0.7,0-1.3-0.6-1.3-1.3V6.7z M9.3,10.7v14.7H12V10.7H9.3z M14.7,10.7v14.7h2.7V10.7H14.7z M20,10.7v14.7
	h2.7V10.7H20z"
          />
        </svg>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default HistoryContainer;
