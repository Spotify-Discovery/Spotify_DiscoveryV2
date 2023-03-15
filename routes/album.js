require("dotenv").config();
const express = require('express');
const axios = require('axios');
const router = express.Router();
const { getNullPreviews, searchByTrackName } = require('./searchById.js');
const { getAlbumTracks } = require('../helpers/getAlbumTracks.js');

const SPOTIFY_BASE = 'https://api.spotify.com/v1/';

router.get('/', (req, res, next) => {
  console.log('get albums');
  const access_token = req.cookies.access_token;
  const album_id = req.query.album_id;
  const albumName = req.query.albumName

  axios.get(`${SPOTIFY_BASE}albums/${album_id}/tracks?market=US`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  }).then((result) => {
    // console.log(result)
    Promise.all(
      result.data.items.map((track, i) => {
        if (track.preview_url === null) {
          console.log('preview', track.preview_url, i)
          return searchByTrackName(track, albumName, access_token)
            .then((updatedUrl) => {
              // console.log("updated Url", updatedUrl, i);
              track.preview_url = updatedUrl;
              return track;
            })
        }
        return track;
      })
    ).then((result) => {
      res.send(result);
    })
  })
  .catch(next);
})

module.exports = router;