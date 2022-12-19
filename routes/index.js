const express = require('express');
const router = express.Router();
const axios = require('axios');
const { searchById } = require('./searchById.js');

const auth = require('./auth.js');

const SPOTIFY_BASE = 'https://api.spotify.com/v1/';

// Router delegates to other routers as middleware
router.use('/', auth);

router.use('/topTracks:token?:time_range?', (req, res) => {
  const access_token = req.query.token;
  const time_range = req.query.time_range;
  console.log(time_range)
  axios.get(`${SPOTIFY_BASE}me/top/tracks?time_range=${time_range}`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  .then((result) => {
    console.log(result.data.items)
    searchById(result.data.items, access_token)
      .then((updatedResults) => {
        // console.log(updatedResults)
        res.send(updatedResults)
      })
  })
  .catch((e) => {console.log(e)})
})

router.use('/topArtists:token?:time_range?', (req, res) => {
  const access_token = req.query.token;
  const time_range = req.query.time_range;
  console.log(time_range)
  axios.get(`${SPOTIFY_BASE}me/top/artists?time_range=${time_range}`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  .then((result) => {
    res.send(result.data)
  })
})

module.exports = router;