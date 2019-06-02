/*
 * @Descripttion: ip的数据库操作方法
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-22 16:33:27
 * @LastEditors: khdjj
 * @LastEditTime: 2019-05-30 11:20:56
 */

var ipModel = require('../models/ip'),
    chalk = require('chalk');

exports.readIP = function(){
    ipModel.find({},function(err,doc){
        if(err){
            console.log(chalk.red('查找ip数据出错'));
            console.log(chalk.red(err));
        }else{
            return doc;
        }
    })
}