/*
 * @Descripttion: 用户model的数据库操作
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-26 19:50:58
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-15 15:20:34
 */

let userModel = require('../models/userModels'),
    songSheetModel = require('../models/songSheetModels'),
    chalk = require('chalk');


exports.findUserCollectSimple = async function(userid){
    return new Promise((resolve,reject)=>{
        userModel.find({userId:userid},{collections:1,_id:0},(err,docs)=>{
            if(!err){
                songSheetModel.find({'id':{'$in':docs[0].collections}},(err,docs)=>{
                    if(err) reject(err);
                    resolve(docs);
                })
            }
        })
    })
}


exports.insertUser =  function (email, pwd,userId) {
    let user = new userModel({
        userId: userId,
        email: email,
        pwd: pwd,
        isqq: false,
        iswb: false
    });
    return new Promise((resolve,reject)=>{
         user.save(function (err, docs) {
            if (err) {
                console.log(chalk.red("插入用户数据错误"));
                reject(err);
            } else {
                console.log(chalk.green("插入用户数据成功"));
                resolve(docs);
            }
        });
    })
}

exports.updateAvatar = async function(userId,realpath){
    console.log(userId);
    userModel.updateOne({userId:userId},{$set:{"avatarUrl":realpath}},function(err,docs){
        if(err){
            console.log(chalk.red("插入用户头像错误"));
            console.log(chalk.red(err));
        }else{
            console.log(chalk.green("插入用户头像成功"));
        }
    });
}

exports.searchBynickname = async function(nickname){
   return await userModel.find({nickname:nickname});
}


exports.saveUsersData = async function(nickname,desc,sex,userId){
     userModel.updateOne({userId:userId},{$set:{"nickname":nickname,"desc":desc,"sex":sex}},function(err,docs){
        if(err){
            console.log(chalk.red("插入用户信息错误"));
            console.log(chalk.red(err));
        }else{
            console.log(chalk.green("插入用户信息成功"));
        }
     })
}

exports.loginUser = async function(email,pwd){
    return await userModel.findOne({email:email,pwd:pwd},{_id:0});
}

exports.emailisAvailable = async function(email){
    return await userModel.findOne({email:email});
}

exports.addToCollectionPlayList = function(userid,playlistid){
    return new Promise((resolve,reject)=>{
        userModel.updateOne({userId:userid},{$addToSet:{'collections':playlistid}},function(err,docs){
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