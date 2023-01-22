require("dotenv").config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

const { searchById } = require('./searchById.js')

const SPOTIFY_BASE = 'https://api.spotify.com/v1/';

router.get(':token?:track_id?', (req, res) => {
  console.log('in related')
  const access_token = req.query.token;
  const track_id = req.query.track_id;
  axios.get(`${SPOTIFY_BASE}recommendations?seed_tracks=${track_id}&limit=45&market=US`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  .then((result) => {
    searchById(result.data.tracks, access_token)
      .then((updatedResults) => {
        console.log(updatedResults)
        res.send(updatedResults)
      })
  })
  .catch((err) => {
    console.log(err);
  })
})

module.exports = router;