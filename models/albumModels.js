/*
 * @Descripttion: 专辑 Model
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-19 17:29:44
 * @LastEditors: khdjj
 * @LastEditTime: 2019-05-30 11:14:38
 */
"use strict"
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumchema = new Schema({
    album_id: String, //专辑id
    album_img: String,//专辑封面图片
    album_name: String,//专辑封面图片
    album_create_time: String,//专辑创建时间
    album_desc: String,//专辑介绍
    album_company,//专辑发行公司
    songs: [
        {
            song_id: String
        }
    ],
});

const album = mongoose.model('album', albumchema);

module.exports = album;