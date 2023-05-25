require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();

const { searchByTrackName } = require("./searchById.js");
const {
  getPreviewsForArtists,
} = require("../helpers/getPreviewsForArtists.js");
const { getNullPreviews } = require('./searchById.js');

const SPOTIFY_BASE = "https://api.spotify.com/v1/";

const searchForTrack = (trackName, artistName, albumName, access_token) => {
  var artistName = artistName.split(" ").join("%20");
  var trackName = trackName.split(" ").join("%20");
  var albumName = albumName.split(" ").join("%20");

  return axios
    .get(
      `${SPOTIFY_BASE}search?q=track:${trackName}%20artist:${artistName}%20album:${albumName}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data.tracks.items[0].preview_url);
      return response.data.tracks.items[0].preview_url;
    });
};

router.get("/", (req, res) => {
  console.log("params", req.query);
  searchForTrack(
    req.query.trackName,
    req.query.artistName,
    req.query.albumName,
    req.cookies.access_token
  ).then((previewUrl) => {
    res.send(previewUrl);
  });
});

router.get("/artist", (req, res) => {
  console.log("params", req.query);
  let { artistID } = req.query;
  let access_token = req.cookies.access_token;
  axios.get(`${SPOTIFY_BASE}artists/${artistID}/top-tracks?market=US`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
  .then((response) => {
    console.log('response', response.data.tracks[0].preview_url);
    if (response.data.tracks[0].preview_url === null) {
      return getNullPreviews(response.data.tracks[0], access_token)
        .then((updatedUrl) => {
          response.data.tracks[0].preview_url = updatedUrl;
          return response.data.tracks[0];
        })
    } 
    return response.data.tracks[0];
  }).then((updatedTrack) => {
    res.send(updatedTrack);
  })
  // getPreviewsForArtists([req.query.artist], req.cookies.access_token)
  //   .then((previewUrl) => {
  //     console.log('previewUrl', previewUrl)
  //     res.send(previewUrl);
  //   })
});

module.exports = router;
