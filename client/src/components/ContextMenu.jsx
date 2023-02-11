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
          <li>Open in Spotify</li>
          <li>Share</li>
          <li>Copy Link</li>
          <li>Go to Artist</li>
        </ul>
      </div>
    }
    </>
  );
}

export default ContextMenu;