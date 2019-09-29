/*
 * @Descripttion: 歌单Model
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-30 10:54:49
 * @LastEditors: khdjj
 * @LastEditTime: 2019-07-27 17:38:33
 */


"use strict"
let mongoose = require('mongoose'),
    chalk = require('chalk');
const Schema = mongoose.Schema;

const songSheetSchema = new Schema({
    id:{type:String,index:true},
    img:{type:String,default:''},//歌单图片
    play_num:{type:Number,default:0} ,//播放数
    name:{type:String,default:''},//歌单名称
    create_time:{type:String,default:''},//歌单创建时间
    creator:{type:String,default:''},//歌单创建者,
    creator_id:{type:String,default:''},//歌单创建者id
    creator_avatar:{type:String,default:''},//创建者头像
    label:[ //标签
        {cat:String}
    ],
    desc:String,//歌单描述
    song_ids:[ //歌曲id
        {song_id:String}
    ],
    collection_ids:[
        {user_id:String}
    ],
});
songSheetSchema.statics.findPlayListPaginatet = function(order,cat,offset,limit,id){
    offset = parseInt(offset);
    limit = parseInt(limit);
    try{
        if(cat){
            return this.find({'label.cat':`${cat}`},{song_ids:0,desc:0}).skip(offset).limit(limit);
        }else{
            return this.find({},{song_ids:0,desc:0}).skip(offset).limit(limit);
        }
    }catch(err){
        console.log(chalk.red("数据库查询歌单分页错误"));
        return {
            err:err
        }
    }
}


const songSheet = mongoose.model('songSheet',songSheetSchema);
module.exports = songSheet;