require("dotenv").config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

const SPOTIFY_BASE = 'https://api.spotify.com/v1/';

/**
 *
 */
router.put(':token?', (req, res) => {
  const access_token = req.query.token;
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
    .catch((error) => {
      if (error.response.status === 401) {
        res.status(401).send();
      } else {
        res.status(500).send('Spotify responded with a status ' + error.response.status);
      }
    })
});

module.exports = router;