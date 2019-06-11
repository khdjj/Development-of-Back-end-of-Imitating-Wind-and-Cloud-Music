/*
 * @Descripttion:  处理对排行榜的请求
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-02 10:39:30
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-11 10:54:52
 */

let  topListDao = require('../../dao/topListDao');
const ERR = require('../../errorResource');
class TopList {
    constructor(){
        this.getTopListByName = this.getTopListByName.bind(this);
        this.getAllTopList = this.getAllTopList.bind(this);
    }
    async getTopListByName (req,res,next){
        const {name,offset=0,limit=10} = req.query;
        console.log(name,offset,limit);
        try{
           await topListDao.findTopListByName(name,offset,limit).then((data)=>{
                if(!data.err){
                    res.send({
                        code:200,
                        status:1,
                        topList:data.topList,
                        songs:data.songIds
                    });
                }else{
                    res.send({
                        code:200,
                        status:0,
                        data:ERR.DATASOURCE_ERR
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
    async getAllTopList (req,res,next){
        try{
           await topListDao.findAllTopList().then((data)=>{
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
                        data:ERR.DATASOURCE_ERR
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
}

const topList = new TopList();
exports.getTopListByName = topList.getTopListByName;
exports.getAllTopList = topList.getAllTopList;
