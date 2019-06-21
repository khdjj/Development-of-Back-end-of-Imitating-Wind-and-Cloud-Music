/*
 * @Descripttion: 处理对评论的请求
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-12 19:27:06
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-19 19:30:08
 */

let  commentDao = require('../../dao/commentDao');
const  ERR = require('../../errorResource');

class Comment {

    constructor(){
        this.getCommentsById = this.getCommentsById.bind(this);
    }

    async getCommentsById (req,res,next){
        const {id,offset=0,limit=20,type="songComment"} = req.query;
        if(id){
            try{
                await commentDao.findCommentById(id,type,offset,limit).then((data)=>{
                     if(!data.err){
                         res.send(data);
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
        }else{
            res.send({
                code:0,
                status:0,
                data:null
            })
        }
    }
}

const comment = new Comment();
exports.getCommentsById = comment.getCommentsById;
