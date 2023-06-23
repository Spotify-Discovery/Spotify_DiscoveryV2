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
router.get('/', (req, res) => {
  const access_token = req.cookies.access_token;

  axios.get(`${SPOTIFY_BASE}me`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  .then((response) => {
    res.send(response.data)
  })
  .catch(error => {
    if (error.response.status === 401) {
      res.status(401).send();
    } else {
      res.status(500).send('Spotify responded with a status ' + error.response.status);
    }
  })
});

/**
 *  
  // .then((result) => {
  //   console.log(result.data);
  //   Promise.all(
  //     result.data.items.map((track, i) => {
  //       if (track.preview_url === null) {
  //         console.log('preview', track.preview_url, i)
  //         return getNullPreviews(track, access_token)
  //           .then((updatedUrl) => {
  //             // console.log("updated Url", updatedUrl, i);
  //             track.preview_url = updatedUrl;
  //             return track;
  //           })
  //       }
  //       return track;
  //     })
  //   )
 *
 */
router.get('/topTracks:time_range?', (req, res) => {
  const access_token = req.cookies.access_token;
  const time_range = req.query.time_range;

  axios.get(`${SPOTIFY_BASE}me/top/tracks?time_range=${time_range}`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  .then((result) => {
    res.send(result.data.items);
  })
  .catch(error => {
    console.log(error);
    // if (error.response.status === 401) {
    //   res.status(401).send();
    // } else {
    //   res.status(500).send('Spotify responded with a status ' + error.response.status);
    // }
  })
});

/**
 *
 */
router.get('/topArtists:time_range?', (req, res) => {
  const access_token = req.cookies.access_token;
  const time_range = req.query.time_range;

  axios.get(`${SPOTIFY_BASE}me/top/artists?time_range=${time_range}`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  })
  .then((result) => {
    getPreviewsForArtists(result.data.items, access_token)
    .then((updatedResults) => {
      Promise.all(
        updatedResults.map((artist, i) => {

          if (artist.track.preview_url == null) {
            return getNullPreviews(artist.track, access_token)
              .then((updatedUrl) => {
                artist.track.preview_url = updatedUrl;
                console.log('updatedUrl', updatedUrl, i)
                return artist;
              })
          }
          return artist;
        })
      ).then((result) => {
        res.send(result);
      })

    })

  })
  .catch(error => {
    if (error.response.status === 401) {
      res.status(401).send();
    } else {
      res.status(500).send('Spotify responded with a status ' + error.response.status);
    }
  })
});

module.exports = router;