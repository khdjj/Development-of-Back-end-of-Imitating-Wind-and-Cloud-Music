/*
 * @Descripttion: 歌曲的操作方法集
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-20 14:39:11
 * @LastEditors: khdjj
 * @LastEditTime: 2019-05-30 16:44:37
 */


 
/**
 * model 要操作的数据库模型
 * data 要插入的数据  多条数据
 * callback 回调函数
 */

let songModel = require('../models/song');
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