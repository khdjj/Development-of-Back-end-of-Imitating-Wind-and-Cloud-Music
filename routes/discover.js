let express = require('express'),
    playList = require('../controller/discover/playListController'),
    topList = require('../controller/discover/topListController'),
    song =require('../controller/song/songController');
const router = express.Router();

router.get('/playlist',playList.getPlayListPaginate);
router.get('/toplist',topList.getTopListByName);
router.get('/song/player',song.getSongUrl);
router.get('/song/lyric',song.getSongLyric);

exports.router = router;