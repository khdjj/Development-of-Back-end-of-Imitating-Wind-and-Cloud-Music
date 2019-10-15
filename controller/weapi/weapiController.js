/*
 * @Descripttion:对搜索功能的操作
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-26 15:03:05
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-14 10:42:51
 */

let chalk = require('chalk'),
    format = require('../../service/formatDate'),
    getUserId = require('../../service/getUser'),
    getUUID = require('../../service/getUUID'),
    songSheetDao = require('../../dao/songSheetDao'),
    userDao = require('../../dao/userDao'),
    spider = require('../../spider/searchSpider'),
    getpath = require('../../service/getpath');

const  ERR = require('../../errorResource');

class Weapi {

    constructor() {
      this.getSearchData = this.getSearchData.bind(this);
      this.createPlayList = this.createPlayList.bind(this);
      this.getCreatePlayList = this.getCreatePlayList.bind(this);
      this.updatePlayList = this.updatePlayList.bind(this);
      //添加个人创建歌单收藏
      this.addCollection  =this.addCollection.bind(this);
      //添加歌单收藏
      this.addPlayListCollection = this.addPlayListCollection.bind(this);
    }


    /**
     * 添加歌单收藏
     */
    addPlayListCollection(req,res,next){
        let userId = getUserId(req);
        const {playlistid} = req.body;
        console.log(playlistid);
        try{
            userDao.addToCollectionPlayList(userId,playlistid).then(result=>{
                console.log(result);
                if(result.ok == 1){
                    res.send({
                        code:200,
                        msg:"收藏歌单成功"
                    })
                }
            })
        }catch(err){
            res.send({
                code:400,
                msg:ERR.INSERT_COLLECTION_ERR
            })
        }
        


    }

    /**
     * 添加歌曲到歌单列表
     */
    addCollection(req,res,next){
        let userId = getUserId(req);
        const{songid,playlistid} = req.body;
        console.log(songid,playlistid);
        try{
            songSheetDao.addToCollection(userId,playlistid,songid).then(result=>{
                console.log(result);
                if(result.ok== 1){
                    res.send({
                        code:200,
                        msg:"收藏进歌单成功"
                    })
                }
            })
        }catch(err){
            console.log(chalk.red(err));
            res.send({
                code:400,
                msg:ERR.INSERT_COLLECTION_ERR
            })
        }
    }


    /**
     * 修改歌单所有信息
     */
    async updatePlayList(req,res,next){
        try{
            let data = await getpath(req, res);
            console.log(data.imgpath);
            songSheetDao.updatePlayList(data.fields.id,data.fields.name,data.fields.label,data.fields.desc,data.imgpath).then(result=>{
                if(result.ok == 1){
                    res.send({
                        code:200,
                        msg:"修改歌单成功",
                        imgpath:data.imgpath
                    })
                }
            })
        }catch(err){
            res.send({
                code:400,
                msg:ERR.UPDATE_PLAYLIST_ERR
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
exports.addCollection = weapi.addCollection;
exports.addPlayListCollection = weapi.addPlayListCollection;