import React from "react";
import FeedInstanceEntry from "../Feed/FeedInstanceEntry.jsx";
import { useSelector, useDispatch } from "react-redux";

const HistoryContainer = () => {
  const user = useSelector((state) => state.user);

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
    </div>
  ) : (
    <></>
  );
};

export default HistoryContainer;
