require("dotenv").config();
const express = require('express');
const axios = require('axios');
const router = express.Router();
const { searchById, getNullPreviews } = require('./searchById.js')
const { getPreviewsForArtists } = require('../helpers/getPreviewsForArtists.js')

const SPOTIFY_BASE = 'https://api.spotify.com/v1/';

/**
 *
 */
router.get(':token?', (req, res) => {
  const access_token = req.query.token;
  axios.get(`${SPOTIFY_BASE}me`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  .then((response) => {
    // console.log(res.data);
    res.send(response.data)
  })
});

/**
 *
 */
router.get('/topTracks:token?:time_range?', (req, res) => {
  console.log('topTracks')
  const access_token = req.query.token;
  const time_range = req.query.time_range;
  console.log(time_range)
  axios.get(`${SPOTIFY_BASE}me/top/tracks?time_range=${time_range}`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  .then((result) => {
    console.log(result.data);
    Promise.all(
      result.data.items.map((track, i) => {
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
  .catch((e) => {console.log(e)})
});

/**
 *
 */
router.get('/topArtists:token?:time_range?', (req, res) => {
  const access_token = req.query.token;
  const time_range = req.query.time_range;
  console.log(time_range)
  axios.get(`${SPOTIFY_BASE}me/top/artists?time_range=${time_range}`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  .then((result) => {
    // console.log('res data:', result.data)
    getPreviewsForArtists(result.data.items, access_token)
    .then((updatedResults) => {
      // console.log('updtate:', updatedResults);
      console.log('legnth:', updatedResults.length);
      res.send(updatedResults)
    })

  }).catch((err) => {console.log('error', err)})
});

module.exports = router;