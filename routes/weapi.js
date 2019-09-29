const express = require('express'),
      weapi = require('../controller/weapi/weapiController');
const router = express.Router();

router.post('/cloudsearch/get/web',weapi.getSearchData)
router.post('/playlist/create',weapi.createPlayList);
router.post('/playlist/getcreateplaylist',weapi.getCreatePlayList);
router.post('/playlis/update',weapi.updatePlayList);
exports.router  = router;

