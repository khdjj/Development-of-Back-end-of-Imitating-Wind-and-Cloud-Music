let songSheetModel = require('../models/songSheetModels'),
    chalk = require('chalk');

exports.insertMany = function (data, callback) {
    songSheetModel.insertMany(data, function (err, docs) {
        if (err) {
            console.log(chalk.red('插入多份歌单数据错误'));
            console.log(chalk.red(err));
        } else {
            console.log(chalk.green('插入多份歌单数据成功'));
        }
    });
}

exports.insert = function (data, callback) {

    let songSheet = new songSheetModel({
        id: data.id,
        img: data.img,
        play_num: data.play_num,
        name: data.name,
        create_time: data.create_time,
        creator: data.creator,
        creator_avatar: data.creator_avatar,
        label: data.label,
        desc: data.desc,
        song_ids: data.song_ids,
        collection_ids: null
    })

    songSheet.save(function (err, res) {
        if (err) {
            console.log(chalk.red('插入多份歌单数据错误'));
            console.log(chalk.red(err));
        } else {
            console.log(chalk.green('插入多份歌单数据成功'));
        }
    });
}

exports.findPlayListPaginatet = async function(order,cat,offset,limit){
    return await songSheetModel.findPlayListPaginatet(order,cat,offset,limit);
}
exports.findPlayListById = function(id){

}


