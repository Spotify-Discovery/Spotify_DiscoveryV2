require("dotenv").config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

const { searchById, getNullPreviews, searchByTrackName } = require('./searchById.js');
const { getPreviewsForArtists } = require('../helpers/getPreviewsForArtists.js');
const { getAlbumTracks } = require('../helpers/getAlbumTracks.js');

const SPOTIFY_BASE = 'https://api.spotify.com/v1/';



/**
 *
 */
router.get('/', (req, res) => {
  let responseData = {}

  const access_token = req.cookies.access_token;
  const artist_id = req.query.artist_id;

  //TODO: set country to user's
  axios.get(`${SPOTIFY_BASE}artists/${artist_id}/top-tracks?market=US`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  .then((result) => {
    return Promise.all(
      result.data.tracks.map((track, i) => {
        if (track.preview_url === null) {
          // console.log('preview', track.preview_url, i)
          return getNullPreviews(track, access_token)
            .then((updatedUrl) => {
              // console.log("updated Url", updatedUrl, i);
              track.preview_url = updatedUrl;
              return track;
            })
        }
        return track;
      })
    )
  }).then((updatedTracks) => {
    console.log(updatedTracks.length)
    responseData['topTracks'] = updatedTracks;

    axios.get(`${SPOTIFY_BASE}artists/${artist_id}/related-artists`, {
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    })
    .then((result) => {
      // console.log(result.data)

      getPreviewsForArtists(result.data.artists, access_token)
        .then((updatedResults) => {
          Promise.all(
            updatedResults.map((artist, i) => {
              console.log('preview', artist.track.preview_url, i);
              if (artist.track.preview_url == null) {
                return getNullPreviews(artist.track, access_token)
                  .then((updatedUrl) => {
                    console.log("updated Url", updatedUrl, i);
                    artist.track.preview_url = updatedUrl;
                    return artist;
                  })
              }
              return artist;
            })
          ).then((result) => {
            responseData['relatedArtists'] = result;

            axios.get(`${SPOTIFY_BASE}artists/${artist_id}/albums?market=US`, {
              headers: {
                "Authorization": `Bearer ${access_token}`
              }
            }).then((result) => {
              console.log('reeee', result.data.items.length)
              getAlbumTracks(result.data.items, access_token)
                .then((result) => {
                  console.log('rreeeeeeeee2', result[0].tracks[0]);
                  Promise.all(
                    result.map((album) => {
                      console.log('ALBUM NAME', album.name)
                      return Promise.all(
                        album.tracks.map((track, i) => {
                          console.log('preview', track.preview_url, i);
                          if (track.preview_url === null) {
                            return searchByTrackName(track, album.name, access_token)
                            .then((updatedUrl) => {
                              console.log("updated Url", updatedUrl, i);
                              track.preview_url = updatedUrl;
                              return track;
                            })

                          }
                          return track;
                        })
                      ).then(() => album)
                    })
                  ).then((result) => {
                    responseData['albums'] = result;
                    res.send(responseData);
                  })
                })
            })
          })
        })
    })
  })
});


module.exports = router;

