/*
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-10-14 16:55:42
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-14 20:21:45
 */
let superagent = require('superagent'),
    encryption = require('../encryption/encryption_song');

    exports.getMVUrl = function (id) {
        return new Promise((resolve, reject) => {
            let url = "https://music.163.com/weapi/song/enhance/play/mv/url?csrf_token=";
            let d = encryption.aes(id, 'mv');
            let song_url;
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
                        reject(err);
                    } else {
                        console.log(res.text);
                        try {
                            let data = JSON.parse(res.text);
                            song_url = data.data.url;
                            resolve(song_url);
                        } catch (err) {
                            console.log(err);
                            reject("数据请求错误");
                        }
                    }
                });
        });
    }