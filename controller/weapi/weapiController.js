/*
 * @Descripttion:对搜索功能的操作
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-26 15:03:05
 * @LastEditors: khdjj
 * @LastEditTime: 2019-08-04 22:04:17
 */

let chalk = require('chalk'),
    format = require('../../service/formatDate'),
    getUserId = require('../../service/getUser'),
    getUUID = require('../../service/getUUID'),
    songSheetDao = require('../../dao/songSheetDao'),
    spider = require('../../spider/searchSpider');

const  ERR = require('../../errorResource');

class Weapi {

    constructor() {
      this.getSearchData = this.getSearchData.bind(this);
      this.createPlayList = this.createPlayList.bind(this);
      this.getCreatePlayList = this.getCreatePlayList.bind(this);
    //   this.updatePlayListCover = this.updatePlayListCover.bind(this);
    //   this.updatePlayList = this.updatePlayList.bind(this);
    }




    /**
     * 修改图片
     */
    upatePlayList(req,res,next){
        const {playListId,playListName,playListLabel,playListDesc,playListImg} = req.body;
        console.log(playListId,playListName,playListLabel,playListDesc);
    }


    /**
     * 修改歌单图片
     * @param {} req 
     * @param {*} res 
     * @param {*} next 
     */
    async updatePlayListCover(req,res,next){
        let imgpath = await getpath(req, res);
        try {
            songSheetDao.updateAvatar(userId, imgpath).then(() => {
                res.send({
                    code: 200,
                    url: imgpath,
                    msg: "上传成功"
                })
            })
        } catch (err) {
            console.log(err);
            res.send({
                code: 400,
                msg: ERR.IMG_UPLOAD_ERR
            })
        }
    }


    /**
     * 用于获取用户创建的歌单
     */
    getCreatePlayList(req,res,next){
        let userId = getUserId(req);
        console.log("useId\t"+userId);
        try{
            songSheetDao.findPlayListByUserId(userId).then((data)=>{
                res.send({
                    code:200,
                    status:1,
                    results:data
                })
            })
        }catch(err){
            res.send({
                code:400,
                status:0,
                msg:ERR.DATASOURCE_ERR
            })
        }
    }

    /**
     * 用于处理用户搜索歌单、视频和其他
     */
    getSearchData(req,res,next){
        const {type,s,limit,offset} = req.body;
        console.log(type,s,limit,offset) ;
        try{
            spider.search(type,s,limit,offset).then((data)=>{
                console.log(data);
                res.send(data);
            })
        }catch(err){
            res.send({
                code:400,
                status:0,
                msg:ERR.SEARCH_ERROR
            })
        }
    }
    /**
     * 用于处理用户创建歌单操作
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    createPlayList(req,res,next){
        let {name,coverImgUrl,songIds} = req.body;
        const {authorization} = req.headers;
        let date = format.formatDate(new Date()),
            userId= getUserId(req),
            playListId = getUUID();
        console.log(date,userId,playListId);
        // 如果没有上传imgUrl,则是默认的图片
        coverImgUrl = coverImgUrl || 'https://p1.music.126.net/tGHU62DTszbFQ37W9qPHcg==/2002210674180197.jpg?param=200y200';
        songIds = [] || songIds;
        try{
            songSheetDao.insertSongSheet(playListId,name,date,userId,coverImgUrl,songIds).then((data)=>{
                res.send({
                    code:200,
                    status:1,
                    data:data
                });
            })
        }catch(err){
            console.log(err);
            res.send({
                code:400,
                status:0,
                data:ERR.INSERT_PLAYLIST_ERR
            })
        }
    }

}

const weapi = new Weapi();
exports.getSearchData = weapi.getSearchData;
exports.createPlayList = weapi.createPlayList;
exports.getCreatePlayList = weapi.getCreatePlayList;
exports.updatePlayList = weapi.updatePlayList;
