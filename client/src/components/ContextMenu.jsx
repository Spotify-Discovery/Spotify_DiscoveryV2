import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

const ContextMenu = () => {
  const contextMenu = useSelector((state) => state.contextMenu);

  useEffect(() => {
    console.log('contextMenu', contextMenu)
  }, [contextMenu])

  return (
    <>
    {contextMenu.isClicked &&
      <div className="context-menu" style={{ top: contextMenu.coords.y, left: contextMenu.coords.x}}>
        <ul className="">
          <li><a href={contextMenu.contextInfo.external_urls.spotify} target="_blank" rel="noopener noreferrer">Open in Spotify</a></li>
        </ul>
      </div>
    }
    </>
  );
}

export default ContextMenu;