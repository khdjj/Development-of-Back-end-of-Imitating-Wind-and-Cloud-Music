/*
 * @Descripttion: 排行榜 Model
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-19 10:31:49
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-13 18:44:10
 */


"use strict"
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toplistSchema  = new Schema({
   id:{type:String,index:true},
   cover:String, //封面图片地址
   top_name:String, //排行榜名称 如飙升榜、热歌榜
   song_list:[
      {song_id:String}
   ],
});

const topList = mongoose.model('toplist', toplistSchema);

module.exports = topList;

