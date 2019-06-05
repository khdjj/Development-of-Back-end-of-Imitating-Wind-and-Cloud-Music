/*
 * @Descripttion:  处理对歌曲的请求
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-02 10:39:30
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-05 11:25:57
 */

let  songDao = require('../../dao/songDao');
const ERR = require('../../errorResource');
class Song {
    constructor(){
        this.getSongByIds = this.getSongByIds.bind(this);
    }
    async getSongByIds (req,res,next){
        const {ids,offset=0,limit=10} = req.query;
        console.log(ids,offset,limit);
        try{
           await songDao.findByIds(ids,offset,limit).then((data)=>{
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

const song = new Song();
exports.getSongByIds = topList.getSongByIds;
