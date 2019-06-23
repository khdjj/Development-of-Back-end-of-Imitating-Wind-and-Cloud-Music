/*
 * @Descripttion: 歌曲的操作方法集
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-20 14:39:11
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-22 10:49:51
 */


 
/**
 * model 要操作的数据库模型
 * data 要插入的数据  多条数据
 * callback 回调函数
 */

let songModel = require('../models/songModels'),
    chalk = require('chalk'),
    getSongData = require('../getByCloudMusic/getSongData');
 
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

function saveLyric(id,lyric){
    songModel.updateOne({"song_id":id},{$set:{"lyric":lyric}},function(err,doc){
        if(err){
            console.log(chalk.red("插入歌词数据失败"));
            console.log(chalk.red(err));
        }else{
            console.log(chalk.green("插入歌词数据成功"));
        }
    })
}

exports.findLyric = async function(id){
    let lyric ;
    data = await songModel.find({"song_id":id},{lyric:1});
    //写爬虫时，lyric的默认值不小心写成了function Strig(){[native code]}
    lyric = data[0].lyric;
    if(!lyric || lyric== "function String() { [native code] }"){
        console.log("no lyric");
        lyric = await getSongData.getSongLyric(id);
        saveLyric(id,lyric)
    }
    return lyric;
}