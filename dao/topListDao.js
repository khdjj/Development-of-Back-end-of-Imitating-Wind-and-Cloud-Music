/*
 * @Descripttion: 排行榜的方法集
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-21 11:15:47
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-13 19:05:45
 */



/**
 * model 要操作的数据库模型
 * data 要插入的数据  多条数据
 * callback 回调函数
 */
var chalk = require('chalk'),
    songDao = require('./songDao');
let topListModel = require('../models/topListModels');
exports.insertMany = function (model, data, callback) {

    let topList = new model({
        id:data.id,
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

exports.findTopListByName = async function(name,offset,limit){
    let song =  [];
    let promise = [];
    try{
        let toplist =  await topListModel.find({"top_name":{"$in":name}},{"_id":0});
        for(let i=0;i<toplist.length;i++){
            song.push(await songDao.findByIds(toplist[i].song_list,offset,limit));
        }
            return {
                topList:toplist,
                songIds:song
            }
    }catch(err){
        return {
            err:err
        }
    }
}
exports.findAllTopList = function(){
    try{
        return topListModel.find({},{song_list:0,_id:0,_v:0});
    }catch(err){
        return {
            err:err
        }
    }
}

