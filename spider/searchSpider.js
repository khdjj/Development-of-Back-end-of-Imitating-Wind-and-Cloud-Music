/*
 * @Descripttion: 搜索爬虫
 * @version: 
 * @Author: khdjj
 * @Date: 2019-07-19 21:17:47
 * @LastEditors: khdjj
 * @LastEditTime: 2019-07-20 17:23:10
 */

let superagent = require('superagent'),
    encryption = require('../encryption/encryption_song');
let url = "https://music.163.com/weapi/cloudsearch/get/web?csrf_token=";
//爬取搜索数据

exports.search = function(type,s,limit,offset){
    var d =  encryption.getSearchData(type,s,limit,offset);
    console.log(d);
    return new Promise((resolve,reject)=>{
        superagent
        .post(url)
        .send({
            params: encodeURI(d.encText),
            encSecKey: encodeURI(d.encSecKey)
        }).set({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://music.163.com',
            'Referer': 'https://music.163.com/',
            'User-Agent': 'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52',
        }).end(function (err, res) {
            if (err) {
                reject("请求错误");
            } else {
                resolve(JSON.parse(res.text));
            }
        });
    })
   
}
