let express = require('express'),
    playList = require('../controller/discover/playlist')
const router = express.Router();

router.get('/playlist',playList.getPlayListPaginate);

exports.router = router;