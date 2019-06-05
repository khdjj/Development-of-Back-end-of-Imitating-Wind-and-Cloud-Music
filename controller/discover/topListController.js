/*
 * @Descripttion:  处理对排行榜的请求
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-02 10:39:30
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-05 16:28:15
 */

let  topListDao = require('../../dao/topListDao');
const ERR = require('../../errorResource');
class TopList {
    constructor(){
        this.getTopListByName = this.getTopListByName.bind(this);
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
    // async getPlayListById (req,res,next){
    //     const id = req.query;
    //     if(!id){
    //         res.send({
    //             code:400,
    //             status:0,
    //             type:'ID-IS-REQUIRE',
    //             msg:'对不起，必须携带id参数'
    //         })
    //     }
    //     try{
    //         await songSheetDao.findPlayListById(id);
    //     }catch(err){
    //         res.send({
    //             code:200,
    //             status:0,
    //             type:'PLAYLIST-BY-ID-NOT-FIND',
    //             msg:'对不起，查找该id的歌单时出错'
    //         })
    //     }
    // }
}

const topList = new TopList();
exports.getTopListByName = topList.getTopListByName;
