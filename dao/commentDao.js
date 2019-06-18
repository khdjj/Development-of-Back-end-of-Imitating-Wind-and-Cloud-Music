/*
 * @Descripttion: 对评论数据的数据库操作
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-12 19:28:19
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-13 20:03:13
 */

let model = require('../models/commentModels'),
    getComment = require('../getByCloudMusic/getCommentData'),
    db = require('../mongodb/db'),
    chalk = require('chalk');


saveComments = function (id, data) {

    data.comments.forEach(item => {
        item.total = data.total,
        item.id = id;
        item.hot = "false";
    });

    data.hotComments.forEach(item => {
        item.total = data.total,
        item.id = id;
        item.hot = "true";
    });

    model.insertMany(data.hotComments, function (err, docs) {
        if (err) {
            console.log(chalk.red('插入多份歌单数据错误'));
            console.log(chalk.red(err));
        } else {
            console.log(chalk.green('插入多份歌单数据成功'));
        }
    });
    model.insertMany(data.comments, function (err, docs) {
        if (err) {
            console.log(chalk.red('插入多份歌单数据错误'));
            console.log(chalk.red(err));
        } else {
            console.log(chalk.green('插入多份歌单数据成功'));
        }
    });

}

exports.findCommentById = async function (id, type, offset, limit) {
    let data = await model.find({ id: id });
    let CommentsData;
    //之所以不用 !data是因为MongoDB查找数据，如果没有此数据，会返回一个空数组，所以!data会一直成立 
    if (!data[0]) {
        if (type == "songComment") {
            console.log("songComment");
            CommentsData= await getComment.getSOComments(id, limit, offset);
        } else if (type == "playListComment") {
            console.log("playComment");
            CommentsData = await getComment.getPYComments(id, limit, offset);
        }
        saveComments(id, CommentsData);
        return CommentsData;
    } else {
        return data;
    }
}