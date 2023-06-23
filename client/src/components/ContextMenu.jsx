import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import spotify from "../helpers/spotify";

const ContextMenu = () => {
  const contextMenu = useSelector((state) => state.contextMenu);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("contextMenu", contextMenu);
  }, [contextMenu]);

  return (
    <>
      {contextMenu.isClicked && (
        <div
          className="context-menu"
          style={{ top: contextMenu.coords.y, left: contextMenu.coords.x }}
        >
          <ul className="context-menu-list">
            <li className="context-menu-item">
              <a
                style={{ color: "inherit", textDecoration: "none" }}
                target="_blank"
                href={contextMenu.item.external_urls.spotify}
              >
                Open in Spotify
              </a>
            </li>
            
            <li className="context-menu-item"
              onClick={() => {
                navigator.clipboard.writeText(contextMenu.item.external_urls.spotify);
              }}
            >Copy Link</li>
            {contextMenu.type === "track" && (
              <>
              <li className="context-menu-item">Go To Artist</li>
              <li className="context-menu-item">Go To Album</li>
              <li className="context-menu-item">Like</li>
              </>
            )}
            {contextMenu.type === "artist" && (
              <>
              <li className="context-menu-item"
                onClick={() => {
                  spotify.followArtist(user, dispatch, contextMenu.item);
                }}
              >Follow</li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default ContextMenu;
