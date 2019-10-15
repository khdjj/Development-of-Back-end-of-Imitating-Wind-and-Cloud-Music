/*
 * @Descripttion:  处理对歌曲的请求
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-02 10:39:30
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-14 20:26:23
 */

let  songDao = require('../../dao/songDao'),
     mv = require('../../getByCloudMusic/getMVData')
     getSongData = require('../../getByCloudMusic/getSongData');
const ERR = require('../../errorResource');
class Song {
    constructor(){
        this.getSongByIds = this.getSongByIds.bind(this);
        this.getSongUrl = this.getSongUrl.bind(this);
        this.getSongLyric = this.getSongLyric.bind(this);
        this.getMV = this.getMV.bind(this);
    }

    getMV(req,res){
        const {id}  = req.body;
        try{
            mv.getMVUrl(id).then(result=>{
                res.send({
                    code:200,
                    url:result
                })
            })
        }catch(err){
            res.send({
                code:400,
                msg:"对不起,网络错误"
            })
        }
        
    }

    async getSongByIds (req,res,next){
        const {ids,offset=0,limit=10} = req.body;
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
    async getSongUrl(req,res,next){
        let {id=''} = req.query;
        if(!id){
            res.send({
                code:400,
                status:0,
                msg:ERR.PARAMS_ERR
            });
        }
        try{
            await  getSongData.getSongUrl(id).then((data)=>{
                res.send({
                    code:200,
                    status:1,
                    url:data
                })
            })
        }catch(err){
            res.send({
                code:400,
                status:0,
                msg:ERR.GET_ERR
            })
        }
    }
    async getSongLyric(req,res,next){
        const {id} = req.query;
        if(!id){
            res.send({
                code:400,
                status:0,
                msg:ERR.PARAMS_ERR
            });
        }
        try{
            await  songDao.findLyric(id).then((data)=>{
                console.log(data);
                res.send({
                    code:200,
                    status:1,
                    lyric:data
                })
            })
        }catch(err){
            res.send({
                code:400,
                status:0,
                msg:ERR.GET_ERR
            })
        }
    }
}

const song = new Song();
exports.getSongByIds = song.getSongByIds;
exports.getSongUrl = song.getSongUrl;
exports.getSongLyric = song.getSongLyric;
exports.getMV = song.getMV;