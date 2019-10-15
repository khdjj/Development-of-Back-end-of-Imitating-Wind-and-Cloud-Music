/*
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-02 10:23:11
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-15 20:24:33
 */
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
router.post('/song/play/mv/url',song.getMV);
router.get('/resource/comments',comments.getCommentsById);
router.post('/playlist/total',playList.getPlayListTotal);
exports.router = router;