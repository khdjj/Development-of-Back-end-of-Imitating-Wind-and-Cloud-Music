let superagent = require('superagent'),
    encryption = require('../encryption/encryption_song'),
    comments = require('../spiderData/CommentData.json'),
    chalk = require('chalk');
exports.getSOComments = function (id, limit = 20, offset = 0) {
    let url = "https://music.163.com/weapi/v1/resource/comments/R_SO_4_" + id + "?csrf_token=";
    let d = encryption.aes(id, 'songComment', limit, offset);
    return new Promise((resolve, reject) => {
        superagent
            .post(url)
            .send({
                params: encodeURI(d.encText),
                encSecKey: encodeURI(d.encSecKey)
            })
            .set({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'https://music.163.com',
                'Referer': 'https://music.163.com/',
                'User-Agent': 'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52'
            }).end(function (err, res) {
                if (err) {
                    console.log("评论请求错误");
                    reject("err");
                } else {
                    try {
                        resolve(JSON.parse(res.text));
                    } catch (err) {
                        reject("err");
                    }
                }
            });
    })

}
exports.getPYComments = function (id, limit = 20, offset = 0) {
    let url = "https://music.163.com/weapi/v1/resource/comments/A_PL_0_" + id + "?csrf_token=";
    let d = encryption.aes(id, 'playListComment', limit, offset);
   return new Promise((resolve, reject) => {
        superagent
            .post(url)
            .send({
                params: encodeURI(d.encText),
                encSecKey: encodeURI(d.encSecKey)
            })
            .set({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'https://music.163.com',
                'Referer': 'https://music.163.com/',
                'User-Agent': 'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52'
            }).end(function (err, res) {
                if (err) {
                    console.log("评论请求错误");
                    reject("err");
                } else {
                    try {
                        resolve(JSON.parse(res.text));
                    } catch (err) {
                        reject("err");
                    }
                }
            });
    })

}
exports.getTestComments = function (id, limit = 20, offset = 0) {
    let url = "https://music.163.com/weapi/v1/resource/comments/A_PL_0_" + id + "?csrf_token=";
    let d = encryption.aes(id, 'playListComment', limit, offset);
   return new Promise((resolve, reject) => {
      resolve(comments);
    });
}
// getSOComments('239682',20,0);