/*
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-31 10:20:26
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-15 20:57:44
 */
let songSheetModel = require('../models/songSheetModels'),
    userModel = require('../models/userModels'),
    chalk = require('chalk');

exports.insertMany = function (data, callback) {
    songSheetModel.insertMany(data, function (err, docs) {
        if (err) {
            console.log(chalk.red('插入多份歌单数据错误'));
            console.log(chalk.red(err));
        } else {
            console.log(chalk.green('插入多份歌单数据成功'));
        }
    });
}

//此函数是将歌曲的id添加进歌单的id中
exports.addToCollection = function(userid,playlistid,songid){
    return new Promise((resolve,reject)=>{
        songSheetModel.updateOne({creator_id:userid,id:playlistid},{$addToSet:{'song_ids':{song_id:songid}}},function(err,docs){
            if(err){
                reject("歌曲插入歌单错误");
                console.log("歌曲插入歌单错误")
            }else{
                resolve(docs);
                console.log("歌曲插入歌单成功");
            }
        })
    })
}

//此插入函数是专门为爬虫数据建立的函数，用户自建的歌单是另外的函数
exports.insert = function (data) {

    let songSheet = new songSheetModel({
        id: data.id,
        img: data.img,
        play_num: data.play_num,
        name: data.name,
        create_time: data.create_time,
        creator: data.creator,
        creator_avatar: data.creator_avatar,
        label: data.label,
        desc: data.desc,
        song_ids: data.song_ids,
        collection_ids: null
    })

    songSheet.save(function (err, res) {
        if (err) {
            console.log(chalk.red('插入歌单数据错误'));
            console.log(chalk.red(err));
        } else {
            console.log(chalk.green('插入歌单数据成功'));
        }
    });
}


exports.getTotal = function(){
    return new Promise((resolve,reject)=>{
        songSheetModel.countDocuments({},(err,count)=>{
            if(err){
                reject(err);
            }else{
                resolve(count);
            }
        })
    });
}


exports.findPlayListPaginatet = async function(order,cat,offset,limit){
    return await songSheetModel.findPlayListPaginatet(order,cat,offset,limit);
}
exports.findPlayListById = function(id){
    try{
        return  songSheetModel.find({id:id},{_id:0});
    }catch(err){
        return {
            err:err
        }
    }
}


/**
 * 用于处理用户自建的歌单数据
 */
exports.insertSongSheet = function(playListId,name,date,userId,coverImgUrl,songIds){
    return new Promise((resolve,reject)=>{
        userModel.findOne({userId:userId},function(err,docs){
            console.log(docs);
            if(err && !docs.userId){
                reject("用户不存在");
            }else{   
            let nickname = docs.nickname || '未命名用户';  
            let avator = docs.avator || 'http://p2.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=180y180';
            var data = {
                id:playListId,
                img:coverImgUrl,
                name:name,
                create_time:date,
                creator:nickname,
                creator_id:userId,
                creator_avatar:avator,
                song_ids:songIds
            }
            let songSheet = new songSheetModel(data);
               songSheet.save(function(err,docs){
                    if(err){
                        reject("歌单数据插入错误");
                    }else{
                        resolve(docs);
                    }
                })
            }
        })
    })
  
}   


exports.findPlayListByUserId = function(userId){

    return new Promise((resolve,reject)=>{
        songSheetModel.find({creator_id:userId},function(err,docs){
            if(err){
                console.log(chalk.red(err));
                reject("查找用户歌单数据错误");
            }else{
                resolve(docs);
            }
        })
    })
}

// exports.updateCoverImg = function(userId,playListId,imgpath){
//     songSheetModel.updateOne({creator_id:userId,id:playListId},{$set:{"img":imgpath}},function(err,docs){
//         if(err){
//             console.log(chalk.red("修改歌单图片错误"));
//             console.log(chalk.red(err));
//         }
//     });
// }


exports.updatePlayList =  function(id,name,label,desc,imgpath){
    let l = label.split(',');
    let lbl = [];
    for(let i = 0;i<l.length;i++){
        lbl.push({cat:l[i]});
    }
    console.log(id);
    console.log(lbl);
    return new Promise((resolve,reject)=>{
         songSheetModel.updateOne({id:id},{$set:{"img":imgpath},"name":name,"desc":desc,"label":lbl},function(err,docs){
            if(err){
                console.log(chalk.red("修改歌单数据错误"));
                reject("修改歌单数据错误");
            }else{
                console.log(chalk.blue("修改歌单数据成功"));
                resolve(docs);
            }
        });
    })
    
}