/*
 * @Descripttion: 排行榜的方法集
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-21 11:15:47
 * @LastEditors: khdjj
 * @LastEditTime: 2019-05-30 11:21:48
 */



/**
 * model 要操作的数据库模型
 * data 要插入的数据  多条数据
 * callback 回调函数
 */
var chalk = require('chalk');
exports.insertMany = function (model, data, callback) {

    let topList = new model({
        cover: data.cover, //封面图片地址
        top_name: data.top_name, //排行榜名称 如飙升榜、热歌榜
        song_list: data.song_list
    });
    topList.save(function (err, docs) {
        if (err) {
            console.log(chalk.red("插入排行榜文档错误"));
            console.log(chalk.red(err));
        } else {
            console.log(chalk.green("插入排行榜文档成功"));
        }
    })
}