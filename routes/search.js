require("dotenv").config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

const SPOTIFY_BASE = 'https://api.spotify.com/v1/';

router.get(':q?:type?', (req, res, next) => {
  const access_token = req.cookies.access_token;
  const q = req.query.q;
  const type = req.query.type || 'track,artist';
  axios.get(`${SPOTIFY_BASE}search?q=${q}&type=${type}&limit=5&market=US`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  .then((response) => {
    if (response.status === 200) {
      res.send(response.data);
    } else {
      res.status(500).send('Spotify responded with a status ' + response.status);
    }
  })
  .catch(next);

});

module.exports = router;