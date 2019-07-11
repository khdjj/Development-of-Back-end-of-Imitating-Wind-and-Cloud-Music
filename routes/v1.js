let express = require('express'),
    user = require('../controller/v1/userController'),
    capchas = require('../controller/v1/capchasController');

const router = express.Router();

router.get('/getCaptchas',capchas.getCapchas);
router.get('/register',user.register);
router.post('/users/avatar',user.updateAvatar);
router.get('/search/nickname',user.searchBynickname);
router.post('/users/login',user.login);
exports.router = router;