let express = require('express'),
    playlist = require('../controller/discover/playlist')
const router = express.Router();

router.get('/playlist',playlist);

