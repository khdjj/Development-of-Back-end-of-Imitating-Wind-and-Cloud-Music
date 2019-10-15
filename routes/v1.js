/*
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-26 11:39:49
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-15 08:35:15
 */
let express = require('express'),
    user = require('../controller/v1/userController'),
    comments = require('../controller/comments/commentsController');
    capchas = require('../controller/v1/capchasController');

const router = express.Router();

router.get('/getCaptchas',capchas.getCapchas);
router.get('/register',user.register);
router.post('/users/avatar',user.updateAvatar);
router.get('/search/nickname',user.searchBynickname);
router.post('/users/improve',user.improve);
router.post('/users/login',user.login);
router.post('/users/getCollectPlayList',user.getCollect);
router.post('/users/createComment',comments.createComment);
exports.router = router;