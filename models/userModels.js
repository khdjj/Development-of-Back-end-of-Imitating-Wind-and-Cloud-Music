/*
 * @Descripttion: 用户 model
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-25 21:27:42
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-14 10:02:24
 */

 "use strict"
 let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let userSchema = new Schema({
    userId:{type:String,index:true}, //用户id
    email:String,//用户email
    pwd:String,//用户密码
    avator:String,//用户头像
    age:Number,//用户年龄
    hobby:Object,//用户喜欢的音乐标签
    nickname:String,//昵称
    desc:String,//个人介绍
    sex:String,//性别
    birth:String,//生日
    isqq:Boolean,//是否是qq
    iswb:Boolean,//是否是微信
    qq:String,//qq帐号
    wb:String,//微薄帐号
    collections:[{
        collect_id:String
    }],//收藏歌单id
    comment_id:[{
        commet_id:String
    }],//评论id
    current_songId:String,//当前听的歌曲id
    current_playlists:[{
        song_id:String
    }]//当前所听歌曲歌单
})

const user = mongoose.model('user',userSchema);
module.exports = user;