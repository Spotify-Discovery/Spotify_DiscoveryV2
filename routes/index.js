const express = require('express');
const router = express.Router();
const axios = require('axios');
const { searchById } = require('./searchById.js');

const auth = require('./auth.js');
const user = require('./user.js');
const player = require('./player.js');
const related = require('./related.js');
const artist = require('./artist.js');
const search = require('./search.js');
const album = require('./album.js');

const SPOTIFY_BASE = 'https://api.spotify.com/v1/';

// Router delegates to other routers as middleware
router.use('/', auth);
router.use('/user', user);
router.use('/player', player);
router.use('/related', related);
router.use('/artist', artist);
router.use('/search', search);
router.use('/album', album);

module.exports = router;