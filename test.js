// let superagent = require('superagent'),
//     ipDao = require('./dao/ipDao');
// require('superagent-proxy')(superagent);

// let get = function(ip){
//     superagent
//     .get("www.baidu.com")
//     .proxy(`http://${ip}`)
//     .set({
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Origin': 'https://music.163.com',
//         'Referer': 'https://music.163.com/',
//         'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
//     }).end(function (err, res) {
//         if (err) {
//             console.log("请求错误");
//             console.log(err);
//             if(err.errno == 'ETIMEDOUT'){
//                 ipDao.getIp().then((data)=>{
//                     console.log(data);
//                     get(data);
//                 });  
//             }
//         } else {
//             console.log("ok");
//         }
//     });
// }
// get('103.70.204.65:46351');

// module.exports = {
//     get
// }



let lyric = `
[00:00.000] 作曲 : 李荣浩
[00:01.000] 作词 : 李荣浩
[00:25.03]编曲：李荣浩
[00:27.78]
[00:29.91]电视一直闪
[00:33.03]联络方式都还没删
[00:36.78]你待我的好
[00:40.52]我却错手毁掉
[00:43.92]
[02:25.47][00:44.52]也曾一起想
[02:28.74][00:47.72]有个地方睡觉吃饭
[02:33.14][00:51.41]可怎么去熬日夜颠倒连头款也凑不到
[02:40.76][00:58.91] 墙板 被我砸烂 到现在还没修
[02:47.78][01:05.97]一碗热的粥 你怕我没够 都留一半带走
[02:54.33][01:12.51]给你形容 美好今后你常常眼睛会红
[03:02.25][01:20.42]原来心疼我 我那时候不懂
[03:08.74][01:27.35]假如我年少有为不自卑
[03:13.33][01:31.43]懂得什么是珍贵
[03:16.08][01:34.43]那些美梦
[03:17.98][01:37.37]没给你 我一生有愧
[03:23.64][01:41.29]假如我年少有为 知进退
[03:28.00][01:46.05]才不会让你替我受罪
[03:31.73][01:49.94]婚礼上 多喝几杯
[03:35.03][01:53.14]和你现在那位
[03:41.36]假如我年少有为不自卑
[03:45.92]尝过后悔的滋味
[03:48.67]金钱地位
[03:52.36]搏到了却好想退回
[03:56.39]假如我年少有为 知进退
[04:00.74]才不会让你替我受罪
[04:04.64]婚礼上 多喝几杯
[04:07.80]和你现在那位
[04:15.36]在婚礼上 多喝几杯
[04:18.65]祝我年少有为
[04:30.19]
[04:31.11]制作人：李荣浩
[04:31.79]吉他：李荣浩
[04:32.39]贝斯：李荣浩
[04:32.93]鼓：Alex
[04:33.51]和声编写：李荣浩
[04:33.98]和声：李荣浩
[04:34.41]弦乐编写：李荣浩
[04:34.81]弦乐：国际首席爱乐乐团
[04:35.17]录音师：李荣浩
[04:35.51]混音师：李荣浩
[04:35.74]录音室：北京一样音乐录音室
[04:35.97]混音室：北京一样音乐录音室
[04:36.18]母带后期制作人：李荣浩
[04:36.40]母带后期处理工程师：周天澈TC Z.
[04:36.63]母带后期处理录音室：TC Faders
[04:36.85]`;

let l = lyric,
    timeRegEx = /\[(\d{2}):(\d{2}).(\d{2,4})\]/, //获取歌词时间正则表达式
    lyricTextRegEx = /](.*)$/; //获取歌词文字的正则表达式
l = l.split(/\n/);
//获取歌词文件并解析
let lyricTime = [];
let lyricLine = [];
let str = '';
let status = 0;
for (let i = 0; i < l.length; i++) {
    let c = timeRegEx.exec(l[i]);
    let d = lyricTextRegEx.exec(l[i]);
    console.log(l[i]);
    if (Object.prototype.toString.call(d) == '[object Array]' && timeRegEx.exec(d[1])) {
        l.splice(i + 1, 0, d[1]);
        d[1] = d[1].replace(/^\[(\d{2}):(\d{2}).(\d{2,4})\]/, '');
    }
    //将正则表达式的结果转换成时间和歌词文字，时间统一换算成秒
    if (c && d && (lyricTime.push(parseInt(c[1]) * 60 + parseInt(c[2]) + parseInt(c[3]) / 1000), lyricLine.push(
        d[1])));
}
let strtemp, temp, i, j, len = lyricTime.length, k;
for (i = 0; i < len - 1; i++) {
    k = i;
    for (j = i + 1; j < len; j++) {
        if (lyricTime[j] < lyricTime[k]) {
            k = j;
        }
    }
    temp = lyricTime[i],strtemp = lyricLine[i];
    lyricTime[i] = lyricTime[k],lyricLine[i] = lyricLine[k];
    lyricTime[k] = temp,lyricLine[k] = strtemp;
}
console.log(lyricLine);