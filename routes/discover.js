let express = require('express'),
    playList = require('../controller/discover/playListController'),
    topList = require('../controller/discover/topListController'),
    song =require('../controller/song/songController'),
    comments = require('../controller/comments/commentsController');
const router = express.Router();

router.get('/playlist',playList.getPlayListPaginate);
router.get('/playlist/id',playList.getPlayListById);
router.get('/toplist',topList.getTopListByName);
router.get('/toplist/all',topList.getAllTopList);
router.get('/song/player',song.getSongUrl);
router.get('/song/lyric',song.getSongLyric);
router.post('/song/ids',song.getSongByIds);
router.get('/resource/comments',comments.getCommentsById);

exports.router = router;