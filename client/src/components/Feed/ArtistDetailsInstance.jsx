import React from "react";
import FeedInstanceEntry from "./FeedInstanceEntry.jsx";
import RelatedArtistsEntry from "./RelatedArtistsEntry.jsx";
import AlbumEntry from "./AlbumEntry.jsx";

const { useState, useEffect } = React;

const ArtistDetailsInstance = ({ instance }) => {

  return (
    <div>
      <div className="rec-head-container">
        <div
          className="rec-to-art"
          style={{
            backgroundImage: `url(${instance.relatedTo.images[1].url})`,
          }}
        ></div>

        <div className="rec-text-container">
          <div className="rec-songinfo">
            <div className="recommended-header">{instance.relatedTo.name}</div>

            <div>
              <div className="rec-artistname">
                {instance.relatedTo.genres[0]}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="feed-instance-container">
        <div className="tracks-albums-container">
          <div className="sub-wrapper">
            <div className="feed-subheaders">
              <div className="sub-head-text">Top Tracks</div>
            </div>
            <div className="feed-instance sub-instance">
              {instance.topTracks.map((element) => {
                return <FeedInstanceEntry element={element} />;
              })}
            </div>
          </div>

          { instance.albums.length > 0 && (
          <div className="sub-wrapper">
            <div className="feed-subheaders">
              <div className="sub-head-text">Albums</div>
            </div>
            <div className="feed-instance sub-instance">
              {instance.albums.map((album) => {
                if (album.album_group === "album") {
                  return <AlbumEntry album={album} type={album.album_group} />;
                }
              })}
            </div>
          </div>
          )}

          { instance.singles.length > 0 && (
          <div className="sub-wrapper">
            <div className="feed-subheaders">
              <div className="sub-head-text">Singles</div>
            </div>
            <div className="feed-instance sub-instance">
              {instance.singles.map((album) => {
                if (album.album_group === "single") {
                  return <AlbumEntry album={album} type={album.album_group} />;
                }
              })}
            </div>
          </div>
          )}

          {instance.appearsOn.length > 0 && (
          <div className="sub-wrapper">
            <div className="feed-subheaders">
              <div className="sub-head-text">Appears On</div>
            </div>
            <div className="feed-instance sub-instance">
              {instance.appearsOn.map((album) => {
                if (album.album_group === "appears_on") {
                  return <AlbumEntry album={album} type={album.album_group} />;
                }
              })}
            </div>
          </div>
          )}
        </div>

        <div className="related-artists-container">
          <div className="sub-wrapper">
            <div className="feed-subheaders">
              <div className="sub-head-text">Related Artists</div>
            </div>
            <div className="feed-instance sub-instance">
              {instance.relatedArtists.map((artist) => {
                return <RelatedArtistsEntry artist={artist} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetailsInstance;
