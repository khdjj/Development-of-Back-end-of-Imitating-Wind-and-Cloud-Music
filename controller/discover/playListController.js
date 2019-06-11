/*
 * @Descripttion:  处理对歌单的请求
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-02 10:39:30
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-09 21:37:09
 */

let  songSheetDao = require('../../dao/songSheetDao');
const  ERR = require('../../errorResource');

class PlayList {

    constructor(){
        this.getPlayListPaginate = this.getPlayListPaginate.bind(this);
        this.getPlayListById = this.getPlayListById.bind(this);
    }

    async getPlayListPaginate (req,res,next){
        const {order,cat,offset=35,limit=35} = req.query;
        console.log(order,cat,offset,limit);
        try{
           await songSheetDao.findPlayListPaginatet(order,cat,offset,limit).then((data)=>{
                if(!data.err){
                    res.send({
                        code:200,
                        status:1,
                        data:data
                    });
                }else{
                    res.send({
                        code:400,
                        status:0,
                        msg:ERR.DATASOURCE_ERR
                    });
                }
           });
        }catch(err){
            res.send({
                code:400,
                status:0,
                msg:ERR.FIND_ERR
            })
        }
    }
    async getPlayListById (req,res,next){
        const {id} = req.query;
        if(!id){
            res.send({
                code:400,
                status:0,
                type:'ID-IS-REQUIRE',
                msg:'对不起，必须携带id参数'
            })
        }
        try{
            await songSheetDao.findPlayListById(id).then((data)=>{
                if(!data.err){
                    res.send({
                        code:200,
                        status:1,
                        data:data
                    });
                }else{
                    res.send({
                        code:400,
                        status:0,
                        msg:ERR.DATASOURCE_ERR
                    })
                }
            });
        }catch(err){
            res.send({
                code:400,
                status:0,
                msg:ERR.FIND_ERR
            })
        }
    }
}

const playList = new PlayList();
exports.getPlayListPaginate = playList.getPlayListPaginate;
exports.getPlayListById = playList.getPlayListById;