/*
 * @Descripttion: 排行榜和歌曲爬虫
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-22 16:09:06
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-13 19:24:26
 */


var cheerio = require('cheerio'),
    songModel = require('../models/songModels'),
    songDao = require('../dao/songDao'),
    superagent = require('superagent'),
    encryption = require('../encryption/encryption_song'),
    db = require('../mongodb/db'),
    chalk = require('chalk'),
    topListdao = require('../dao/topListDao'),
    topListModel = require('../models/topListModels')
// superagent_proxy = require('superagent-proxy')(superagent)
//    userAgents = require('../userAgent/userAgent'),

db.openDataSource();
var baseurl = "https://music.163.com";




/**
 * 获取排行榜歌单数据
 * @param {*} url  html地址
 */
function start(url) {
    //let userAgent = userAgents[parseInt(Math.random() * userAgents.length)];
    superagent
        .get(url)
        .set({
            'upgrade-insecure-requests': 1,
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'cache-control': 'max-age=0',
        }).end(function (err, res) {
            if (err) {
                console.log("请求网址错误");
                console.log(err);
            } else {
                let html;
                html = res.text;
                let $ = cheerio.load(html);
                let topList = new Array();
                $('.mine').each(function () {
                    let $this = $(this);
                    let id = $this.attr('data-res-id');
                    let avator = $this.find('a.avatar>img').attr('src');
                    let url = baseurl + $this.find('a.avatar').attr('href');
                    let topname = $this.find('.name>a').text();
                    topList.push({
                        id: id,
                        avator: avator,
                        url: url,
                        topname: topname
                    });
                });
                //爬取所有表单数据
                readTopListData(topList);
            }
        });
}

start("https://music.163.com/discover/toplist");


function readTopListData(topList) {

    let promise = new Array();
    let timer = null;
    let i = 3;
    for (; i < topList.length; i++) {
        (function (i) {
            setTimeout(function(){
                console.log(i);
                superagent
                    .get(topList[i].url)
                    .set({
                        'upgrade-insecure-requests': 1,
                        'user-agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
                        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                        'accept-encoding': 'gzip, deflate, br',
                        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
                        'cache-control': 'max-age=0'
                    }).end(function (err, res) {
                        if (err) {
                            console.log("请求网址错误");
                            console.log(err);
                        } else {
                            let html;
                            let href = [];
                            html = res.text;
                            let $ = cheerio.load(html);
                            let ListData = $('#song-list-pre-data').text();
                            //读取真正的内容信息并存入数据库
                            let songData = new Array();
                            let songIdData = new Array();
                            readSongData(ListData, songData, songIdData).then(function () {
                                saveData(songData, songIdData, topList[i]);
                            });
                        }
                    });
            }, i * 2000);
        })(i);

    };


}


function saveData(songData, songIdData, topList) {

    songDao.insertMany(songData);
    topListdao.insertMany(topListModel, {
        id: topList.id,
        cover: topList.avator, //封面图片地址
        top_name: topList.topname, //排行榜名称 如飙升榜、热歌榜
        song_list: songIdData
    });
}


async function readSongData(ListData, songData, songIdData) {

    console.log(chalk.red('readSongData'));

    var img,
        album_name,
        album_id,
        song_id,
        song_name,
        song_url,
        lyric;
    ListData = JSON.parse(ListData);

    for (let i = 0; i < 100; i++) {
        let artist_names = [],
            artist_ids = [];
        song_id = ListData[i].id;
        songIdData.push({ song_id: song_id });
        song_name = ListData[i].name;
        img = ListData[i].album.picUrl;
        album_name = ListData[i].album.name;
        album_id = ListData[i].album.id;
        for (let j = 0, len = ListData[i].artists.length; j < len; j++) {
            artist_names.push({ artist_name: ListData[i].artists[j].name });
            artist_ids.push({ artist_id: ListData[i].artists[j].id });
        }
        // song_url = await getSongUrl(song_id);
        //lyric =  await getSongLyric(song_id);

        if (song_url == null) {
            song_url = '未知';
        }
        // console.log(chalk.blue(song_url));
        // console.log(chalk.blue(lyric));

        songData.push({
            song_name: song_name, //歌曲名
            song_id: song_id,
            artist_names: artist_names,
            album: album_name,//专辑
            song_url: song_url,//歌曲播放地址
            album_img: img,//专辑封面图片
            //lyric: lyric,//歌词 
            album_id: album_id,//专辑id
            artist_ids: artist_ids
        });

    }
}


/**
 * 获取歌曲播放的mp3地址
 * @param {*} id   歌曲的id
 */
function getSongUrl(id) {

    return new Promise((resolve, reject) => {
        setTimeout(function () {
            let url = "http://music.163.com/weapi/song/enhance/player/url?csrf_token=";
            let d = encryption.aes(id, 'song');
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
                    } else {
                        console.log(res.text);
                        let data = JSON.parse(res.text);
                        song_url = data.data[0].url;
                        resolve(song_url);
                    }
                });
        }, 1000)
    });
}


/**
 * 获取歌曲播放的mp3地址
 * @param {*} id  歌曲的id
 */
function getSongLyric(id) {

    console.log(chalk.red('getSongLyric'));
    console.log('210        ' + id);
    return new Promise((resolve, reject) => {
        setTimeout(function () {
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
                    } else {
                        let data = JSON.parse(res.text);

                        if (typeof data.lrc.lyric == 'undefined') {
                            resolve("未知");
                        }
                        else {
                            lyric = data.lrc.lyric;
                            resolve(lyric);
                        }
                    }
                });
        }, 2000)
    });
}