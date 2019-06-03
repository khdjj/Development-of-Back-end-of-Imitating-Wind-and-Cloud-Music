/*
 * @Descripttion:  处理对歌单的请求
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-02 10:39:30
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-02 21:29:20
 */

let  songSheetDao = require('../../dao/song_sheet_dao');

class PlayList {

    constructor(){
        this.getPlayListPaginate = this.getPlayListPaginate.bind(this);
        this.getPlayListById = this.getPlayListById.bind(this);
    }

    async getPlayListPaginate (req,res,next){
        const {order,cat,offset=35,limit=35} = req.query;
        try{
           await songSheetDao.findPlayListPaginatet(order,cat,offset,limit).then((data)=>{
                console.log(data);
                if(!data.err){
                    res.send({
                        code:200,
                        status:1,
                        data:data
                    });
                }else{
                    res.send({
                        code:200,
                        status:0,
                        data:data
                    });
                }
           });
        }catch(err){
            res.send({
                code:400,
                status:0,
                type:'PLAYLIST-NOT-FIND',
                msg:'对不起，歌单查找失败'
            })
        }
    }
    async getPlayListById (req,res,next){
        const id = req.query;
        if(!id){
            res.send({
                code:400,
                status:0,
                type:'ID-IS-REQUIRE',
                msg:'对不起，必须携带id参数'
            })
        }
        try{
            await songSheetDao.findPlayListById(id);
        }catch(err){
            res.send({
                code:200,
                status:0,
                type:'PLAYLIST-BY-ID-NOT-FIND',
                msg:'对不起，查找该id的歌单时出错'
            })
        }
    }
}

const playList = new PlayList();
exports.getPlayListPaginate = playList.getPlayListPaginate;
exports.getPlayListById = playList.getPlayListById;