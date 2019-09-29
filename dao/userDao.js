/*
 * @Descripttion: 用户model的数据库操作
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-26 19:50:58
 * @LastEditors: khdjj
 * @LastEditTime: 2019-07-27 17:10:28
 */

let userModel = require('../models/userModels'),
    chalk = require('chalk');

exports.insertUser = async function (email, pwd,userId) {
    let user = new userModel({
        userId: userId,
        email: email,
        pwd: pwd,
        isqq: false,
        iswb: false
    });
    try {
        await user.save(function (err, docs) {
            if (err) {
                console.log(chalk.red("插入用户数据错误"));
                console.log(err);
            } else {
                console.log(chalk.green("插入用户数据成功"));
            }
        });
    } catch (err) {
        return {
            err: err
        }
    }
}

exports.updateAvatar = async function(userId,realpath){
    console.log(userId);
    userModel.updateOne({userId:userId},{$set:{"avator":realpath}},function(err,docs){
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