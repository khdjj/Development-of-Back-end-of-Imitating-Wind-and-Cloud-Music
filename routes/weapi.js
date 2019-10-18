/*
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-07-20 10:24:36
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-17 17:21:57
 */
const express = require('express'),
      weapi = require('../controller/weapi/weapiController');
const router = express.Router();

router.post('/cloudsearch/get/web',weapi.getSearchData)
router.post('/playlist/create',weapi.createPlayList);
router.post('/playlist/getcreateplaylist',weapi.getCreatePlayList);
router.post('/playlist/update',weapi.updatePlayList);
router.post('/playlist/addCollection',weapi.addCollection);
router.post('/playlist/toCollectPlayList',weapi.addPlayListCollection);
router.post('/upload/share/img',weapi.getUploadImage);
router.post('/share/create',weapi.createShareTrend);
router.post('/share/getShare',weapi.getShareTrend);
exports.router  = router;

