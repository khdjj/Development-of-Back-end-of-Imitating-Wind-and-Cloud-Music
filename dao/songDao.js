/*
 * @Descripttion: 歌曲的操作方法集
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-20 14:39:11
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-05 17:23:13
 */


 
/**
 * model 要操作的数据库模型
 * data 要插入的数据  多条数据
 * callback 回调函数
 */

let songModel = require('../models/songModels');
var chalk = require('chalk');
exports.insertMany = function(data,callback){
    songModel.insertMany(data,function(err,docs){
        if(err){
            console.log(chalk.red("插入歌曲文档错误"));   
            console.log(chalk.red(err));
        }else{
            console.log(chalk.green("插入歌曲文档成功"));
        }
    })
}
exports.findByIds =async function(song_ids,offset,limit){
    limit = parseInt(limit);
    console.log(limit);
    offset = parseInt(offset);
    let ids = [];
    for(let i = 0 ;i<song_ids.length;i++){
        ids.push(song_ids[i].song_id);
    }
    try{
       return await songModel.find({"song_id":{"$in":ids}},{"_id":0}).limit(limit);
    }catch(err){
        return {
            err:err
        }
    }
}