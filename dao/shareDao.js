/*
 * @Descripttion: 
 * @version: 
 * @Author: khdjj
 * @Date: 2019-10-17 15:27:20
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-17 21:00:49
 */
let shareModel = require('../models/shareModels');



/**
 * 创建分享动态内容
 */
exports.createShareTrend = function (content, id, userInfo, imgList, type,shareContent,time) {
    let share = new shareModel({
        content: content,
        id: id,
        user: userInfo,
        con_img: imgList,
        time: time,
        type: type,
        shareContent:shareContent
    });
    return new Promise((resolve, reject) => {
        share.save(function (err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    })
}

/**
 * 获取内容
 */
exports.getShareTrend = function (offset,limit) {
    return new Promise((resolve, reject) => {
       shareModel.find({}).skip(offset).limit(limit).sort({time:'desc'}).exec((err,docs)=>{
            if(err){
                reject(err);
            }else{
                resolve(docs);
            }
       })
    })
}