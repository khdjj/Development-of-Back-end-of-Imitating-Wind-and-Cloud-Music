/*
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-11 20:14:07
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-15 08:49:31
 */
let superagent = require('superagent'),
    encryption = require('../encryption/encryption_song'),
    comments = require('../spiderData/CommentData.json'),
    ipDao = require('../dao/ipDao'),
    chalk = require('chalk');
require('superagent-proxy')(superagent);

// let ip;
// ipDao.getIp().then(data=>{
//     ip = data;
// })


let getSOComments = function (id, limit = 20, offset = 0) {
    let url = "https://music.163.com/weapi/v1/resource/comments/R_SO_4_" + id + "?csrf_token=";
    let d = encryption.aes(id, 'songComment', limit, offset);
    // ip = ip || '112.95.205.50:8888';
    // console.log(ip);
    return new Promise((resolve, reject) => {
        superagent
            .post(url)
            // .proxy(`http://${ip}`)
            .send({
                params: encodeURI(d.encText),
                encSecKey: encodeURI(d.encSecKey)
            })
            .timeout({ response: 9000})
            .set({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'https://music.163.com',
                'Referer': 'https://music.163.com/',
                'User-Agent': 'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52'
            }).end(function (err, res) {
                if (err) {
                    console.log("评论请求错误");
                    // if(err.errno == 'ETIMEDOUT'){
                    //     ipDao.getIp().then((data)=>{
                    //         ip = data;
                    //         getSOComments(id,limit,offset);
                    //     });  
                    // }
                } else {
                    try {
                        console.log(res.text);
                        resolve(JSON.parse(res.text));
                    } catch (err) {
                        reject("err");
                    }
                }
            });
    })
}
let getPYComments = function (id, limit = 20, offset = 0) {
    let url = "https://music.163.com/weapi/v1/resource/comments/A_PL_0_" + id + "?csrf_token=";
    let d = encryption.aes(id, 'playListComment', limit, offset);
   return new Promise((resolve, reject) => {
        superagent
            .post(url)
            // .proxy(`http://${ip}`)
            .send({
                params: encodeURI(d.encText),
                encSecKey: encodeURI(d.encSecKey)
            })
            .timeout({ response: 9000})
            .set({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'https://music.163.com',
                'Referer': 'https://music.163.com/',
                'User-Agent': 'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52'
            }).end(function (err, res) {
                if (err) {
                    console.log("评论请求错误");
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

let getMVComments = function (id, limit = 20, offset = 0) {
    let url = "https://music.163.com/weapi/v1/resource/comments/R_MV_5_" + id + "?csrf_token=";
    let d = encryption.aes(id, 'mvComment', limit, offset);
   return new Promise((resolve, reject) => {
        superagent
            .post(url)
            .send({
                params: encodeURI(d.encText),
                encSecKey: encodeURI(d.encSecKey)
            })
            .timeout({ response: 9000})
            .set({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'https://music.163.com',
                'Referer': 'https://music.163.com/',
                'User-Agent': 'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52'
            }).end(function (err, res) {
                if (err) {
                    console.log("评论请求错误");
                    reject(err);
                } else {
                    try {
                        resolve(JSON.parse(res.text));
                        console.log(res.text);
                    } catch (err) {
                        reject("err");
                    }
                }
            });
    })
}
module.exports = {
    getSOComments,
    getPYComments,
    getMVComments
}
