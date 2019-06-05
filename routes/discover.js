let express = require('express'),
    playList = require('../controller/discover/playListController'),
    topList = require('../controller/discover/topListController');
const router = express.Router();

router.get('/playlist',playList.getPlayListPaginate);
router.get('/toplist',topList.getTopListByName);

exports.router = router;