require("dotenv").config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

const { searchById, getNullPreviews } = require('./searchById.js')

const SPOTIFY_BASE = 'https://api.spotify.com/v1/';

router.get(':track_id?', (req, res, next) => {

  const access_token = req.cookies.access_token;
  const track_id = req.query.track_id;
  axios.get(`${SPOTIFY_BASE}recommendations?seed_tracks=${track_id}&limit=45&market=US`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  .then((result) => {
    Promise.all(
      result.data.tracks.map((track, i) => {
        if (track.preview_url === null) {
          console.log('preview', track.preview_url, i)
          return getNullPreviews(track, access_token)
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
  .catch(next)
})

module.exports = router;