require("dotenv").config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

const SPOTIFY_BASE = 'https://api.spotify.com/v1/';

/**
 *
 */
router.put('/', (req, res, next) => {
  const access_token = req.cookies.access_token;
  const body = req.body;

  const headers = {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  }

  axios.put(`${SPOTIFY_BASE}me/player`, body, headers)
    .then((response) => {
      if (response.status === 202) {
        res.send(response.data);
      } else {
        res.status(500).send('Spotify responded with a status ' + response.status);
      }
    })
    .catch(next);
});

module.exports = router;