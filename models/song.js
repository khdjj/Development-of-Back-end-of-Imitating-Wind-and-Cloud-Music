/*
 * @Descripttion: 歌曲 Model
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-19 16:21:27
 * @LastEditors: khdjj
 * @LastEditTime: 2019-05-30 14:57:56
 */

"use strict"
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema  = new Schema({
   song_name:String, //歌曲名
   song_id:{type:String,index:true},//歌曲id
   artist_names:[
      {
         artist_name:String
      }
   ],//歌手名
   album:String,//专辑
   song_url:String,//歌曲播放地址
   album_img:String,//专辑封面图片
   lyric:String,//歌词 
   album_id:String,//专辑id
   artist_ids:[
      {
         artist_id:String
      }
   ],//歌手id
   play_volume:{type:Number,default:0},//歌曲播放量
   mv_id:String,//mv
});

const song = mongoose.model('song', songSchema);

module.exports = song;
