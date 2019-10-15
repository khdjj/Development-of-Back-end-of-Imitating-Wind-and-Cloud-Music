/*
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-06 16:14:48
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-06 16:14:48
 */
let superagent = require('superagent'),
    encryption = require('../encryption/encryption_song'),
    ipDao = require('../dao/ipDao');
    require('superagent-proxy')(superagent);

    let ip;
    ipDao.getIp().then(data=>{
        ip = data;
    })
    

let getSongUrl = function (id) {
    return new Promise((resolve, reject) => {
        let url = "https://music.163.com/weapi/song/enhance/player/url/v1?csrf_token=";
        let d = encryption.aes(id, 'song');
        ip = ip || '112.95.205.50:8888';
        let song_url;
        superagent
            .post(url)
            // .proxy(`http://${ip}`)
            .send({
                params: encodeURI(d.encText),
                encSecKey: encodeURI(d.encSecKey)
            })
            // .timeout({ response: 9000})
            .set({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'https://music.163.com',
                'Referer': 'https://music.163.com/',
                'User-Agent': 'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52'
            }).end(function (err, res) {
                if (err) {
                    console.log("请求错误");
                    console.log(err);
                    reject(err);
                } else {
                    console.log(res.text);
                    try {
                        let data = JSON.parse(res.text);
                        song_url = data.data[0].url;
                        resolve(song_url);
                    } catch (err) {
                        console.log(err);
                        resolve("数据请求错误");
                    }
                }
            });
    });
}
let getSongLyric = function (id) {

    return new Promise((resolve, reject) => {
        var url = 'https://music.163.com/weapi/song/lyric?csrf_token=2177c6dbc5d25a3c14ea738e6cb12ddb';
        let d = encryption.aes(id, 'lyric');
        ip = ip || '116.196.90.181:3128';
        let lyric;
        superagent
            .post(url)
            .send({
                params: encodeURI(d.encText),
                encSecKey: encodeURI(d.encSecKey)
            })
            // .proxy(`http://${ip}`)
            .timeout({ response: 9000})
            .set({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'https://music.163.com',
                'Referer': 'https://music.163.com/',
                'User-Agent': 'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52',
            }).end(function (err, res) {
                if (err) {
                    console.log("请求错误");
                    reject(err);
                } else {
                    try{
                        let data = JSON.parse(res.text);
                        lyric = data.lrc.lyric;
                        resolve(lyric);
                    }catch(err){
                        console.log(err);
                        resolve('数据请求错误');
                    }
                }
            });
    });
}
module.exports = {
    getSongLyric,
    getSongUrl
}


