/*
 * @Descripttion: 分享 Model
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-19 16:21:27
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-17 20:33:11
 */

"use strict"
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shareSchema = new Schema({
    user: {
        nickname: String,
        avatarUrl: String,
        userId: String,
    },//用户信息
    id: { type: String, index: true },//分享动态id
    content: String,//内容 
    time: String,//时间
    type: String,//类型
    shareContent: {
        id: String,//分享的歌曲id或者是歌单id,
        title: String,//分享的内容的标题
        name: String,//分享的歌曲或者歌单的创建者
        image:String//分享的内容封面
    },
    con_img: [{
        src: String
    }],//内容图片
});

const share = mongoose.model('share', shareSchema);

module.exports = share;
