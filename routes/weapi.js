const express = require('express'),
      weapi = require('../controller/weapi/weapiController');
const router = express.Router();

router.post('/cloudsearch/get/web',weapi.getSearchData)
exports.router  = router;

