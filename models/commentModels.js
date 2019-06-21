/*
 * @Descripttion:  评论 model
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-11 19:47:50
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-19 21:14:25
 */

let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let commentSchema = new Schema({
    id:{type:String,index:true},//id
    hot:Boolean,// 是否是精彩评论
    total:{type:Number,default:20} ,
    beReplied: [
        {
            beRepliedCommentId: String,//答复信息id
            content: String,//答复内容
            expressionUrl: String,
            status: Number,
            user: {
                authStatus: Number,
                avatarUrl: String,//用户的头像
                expertTags: Object,
                experts: Object,
                liveInfo: String,
                locationInfo: String,
                nickname: String,//用户名称
                remarkName: String,
                userId: String,//用户id
                userType: Number,//用户类型
                vipType: Number
            }
        }
    ],// 答复信息
    commentId: String,
    commentLocationType: Number,
    content: String,//答复内容
    decoration: Object,
    expressionUrl: Object,
    liked: Boolean,
    likedCount: Number,
    parentCommentId: String,
    pendantData: Object,
    repliedMark: Boolean,
    showFloorComment: Object,
    status: Number,
    time: Number,
    user:{
        authStatus: Number,
        avatarUrl: String,//用户的头像
        expertTags: Object,
        experts: Object,
        liveInfo: String,
        locationInfo: String,
        nickname: String,//用户名称
        remarkName: String,
        userId: String,//用户id
        userType: Number,//用户类型
        vipType: Number
    }
})

const comment = mongoose.model('comment',commentSchema);

module.exports = comment;
