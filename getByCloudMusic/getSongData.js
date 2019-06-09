let cheerio = require('cheerio'),
    superagent = require('superagent'),
    encryption = require('../encryption/encryption_song'),
    chalk = require('chalk');

exports.getSongUrl = function (id) {
    console.log(id);
    return new Promise((resolve, reject) => {
        let url = "http://music.163.com/weapi/song/enhance/player/url?csrf_token=";
        let d = encryption.aes(id, 'song');
        console.log(id);
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
                    console.log("请求错误");
                    console.log(err);
                    reject();
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
exports.getSongLyric = function (id) {

    return new Promise((resolve, reject) => {
        var url = 'https://music.163.com/weapi/song/lyric?csrf_token=';
        let d = encryption.aes(id, 'lyric');
        let lyric;
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
                'User-Agent': 'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52',
            }).end(function (err, res) {
                if (err) {
                    console.log("请求错误");
                    reject();
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
