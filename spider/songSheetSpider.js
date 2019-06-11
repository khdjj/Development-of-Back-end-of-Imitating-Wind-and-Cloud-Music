/*
 * @Descripttion: 歌单数据爬虫
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-30 14:59:34
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-09 20:48:29
 */

let superagent = require('superagent'),
    cheerio = require('cheerio'),
    songSheetDao = require('../dao/songSheetDao'),
    songDao = require('../dao/songDao'),
    db = require('../mongodb/db'),
    chalk = require('chalk'),
    decryptData = require('../encryption/decryption_song_sheet');


//打开数据库
db.openDataSource();
let url = 'https://music.163.com/discover/playlist/?order=hot&cat=%E5%85%A8%E9%83%A8&limit=35&offset=105',
    BaseUrl = 'https://music.163.com/';
//爬取歌单网页
superagent
    .get(url)
    .set({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://music.163.com',
        'Referer': 'https://music.163.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
    }).end(function (err, res) {
        if (err) {
            console.log("请求错误");
            console.log(err);
        } else {
            let html = res.text,
                $ = cheerio.load(html),
                urlList = new Array();
            //找到所有的歌单的url地址
            $('#m-pl-container li').each(function () { 
                urlList.push($(this).find('.u-cover a').attr('href'));
            });
            readDetailData(urlList);
        }
    });


/**
 * 
 * @param {*} songSheetData  歌单数据
 * 保存歌单数据
 */
function saveSongSheet(songSheetData) {
    console.log(chalk.blue("6"));
    if (songSheetData) {
        songSheetDao.insert(songSheetData);
    }
}

/**
 * 
 * @param {*} urlList  所有歌单的url地址
 *  进入歌单url读取数据
 */
async function readDetailData(urlList) {
    return new Promise((resolve, reject) => {
        for (let i = 1; i < urlList.length; i++) {
            setTimeout(function () {
                superagent
                    .get(BaseUrl + urlList[i])
                    .set({
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Origin': 'https://music.163.com',
                        'Referer': 'https://music.163.com/',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
                    }).end(function (err, res) {
                        if (err) {
                            reject();
                            console.log("请求错误");
                            console.log(err);
                        } else {
                            if (res.body.code != 404) {
                                console.log(chalk.blue("2"));
                                let html = res.text;
                                let $ = cheerio.load(html);
                                //对获取到的href地址进行截取,取得歌单的id
                                let id = urlList[i].replace(/[^0-9]*/, '');
                                readSongSheetData($, id).then(function (data) {
                                    saveSongSheet(data);
                                });
                            }
                        }
                    });

            }, 1000);
        }
    })
}

/**
 * 
 * @param {*} $ 
 * @param {*} id 歌单id
 * 读取歌单中的数据
 */

async function readSongSheetData($, id) {
    console.log(chalk.blue("3"));
    let $header = $('#m-playlist .m-info'),
        img = $header.find('.cover img').attr('src'),
        name = $header.find('h2.f-brk').text(),
        creator_avatar = $header.find('a.face img').attr('src'),
        creator = $header.find('span.name a').text(),
        create_time = $header.find('span.time').text(),
        label = new Array(),
        desc = $header.find('p#album-desc-more').text();
    $header.find('.tags a i').each(function () {
        label.push({ cat: $(this).text() });
    });
    let play_num = $('#play-count').text();

    let key = $('#m-playlist .j-img').attr('data-key'),
        bte4i = $('ul.f-hide li a').attr('href').substring(9, 12),
        value = $('#song-list-pre-data').text();

    let songData = decryptData.decrySongSheet(value, key, bte4i);
    let song_ids = new Array();
    song_ids = await analysisSongData(songData);
    return {
        id,
        img,
        play_num,
        name,
        create_time,
        creator,
        creator_avatar,
        label,
        desc,
        song_ids
    }
}


/**
 * 
 * @param {*} songData 
 * 对解密过的数据进行存储
 */
async function analysisSongData(songData) {
    songData = JSON.parse(songData);
    console.log(chalk.blue("4"));
    let songIdData = new Array();
    let data = new Array();
    for (let i = 0; i < songData.length; i++) {
        let arnames = [],
            arids = [];
        songIdData.push({ song_id: songData[i].id });
        for (let j = 0; j < songData[i].ar.length; j++) {
            arnames.push({ artist_name: songData[i].ar[j].name });
            arids.push({ artist_id: songData[i].ar[j].id });
        }
        let song = {
            song_name: songData[i].name,
            song_id: songData[i].id,
            artist_names: arnames,
            album: songData[i].al.name,
            song_url: null,
            album_img: songData[i].al.picUrl,
            lyric: String,
            album_id: songData[i].al.id,
            artist_ids: arids,
            mv_id: songData[i].mv,
        }
        data.push(song);
    }
    await insertSong(data);
    return songIdData;
}

/**
 * 
 * @param {*} data 
 * 存储歌曲信息
 */
function insertSong(data) {
    songDao.insertMany(data);
}