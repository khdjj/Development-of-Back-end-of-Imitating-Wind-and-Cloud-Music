/*
 * @Descripttion: 歌手 Model
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-19 17:29:52
 * @LastEditors: khdjj
 * @LastEditTime: 2019-05-30 11:14:53
 */

"use strict"
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema  = new Schema({
   artist_name:String, //歌曲名
   artist_id:String ,//歌曲id
   artist_desc:String, //歌曲描述
   artist:String,//歌手名
   albums:[//专辑
      {
         album_id:String //专辑id
      }
   ]
});

const artist = mongoose.model('artist', artistSchema);

module.exports = artist;