const express = require('express');
const router = express.Router();
const axios = require('axios');
const { searchById } = require('./searchById.js');

const auth = require('./auth.js');
const user = require('./user.js');

const SPOTIFY_BASE = 'https://api.spotify.com/v1/';

// Router delegates to other routers as middleware
router.use('/', auth);
router.use('/user', user);

module.exports = router;