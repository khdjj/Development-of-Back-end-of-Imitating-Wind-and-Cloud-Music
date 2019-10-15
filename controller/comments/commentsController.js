/*
 * @Descripttion: 处理对评论的请求
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-12 19:27:06
 * @LastEditors: khdjj
 * @LastEditTime: 2019-10-15 19:22:23
 */

let commentDao = require('../../dao/commentDao'),
    getUserId = require('../../service/getUser'),
    getUUID = require('../../service/getUUID');
const ERR = require('../../errorResource');

class Comment {

    constructor() {
        this.getCommentsById = this.getCommentsById.bind(this);
        this.createComment = this.createComment.bind(this);
    }

    createComment(req, res) {
        const { com,id } = req.body;
        let userId = getUserId(req);
        let commentId = getUUID();
        com.user.userId = userId;
        com.commentId = commentId;
        com.id = id;
        console.log(com);
        try {
            commentDao.saveSelfComment(com).then(result => {
                res.send({
                    code:200,
                    result:result
                })
            })
        } catch (err) {
            res.send({
                code: 400,
                msg: ERR.COMMENT_ERR
            })
        }
    }

    async getCommentsById(req, res, next) {
        const { id, offset = 0, limit = 20, type = "songComment" } = req.query;
        console.log(id, type);
        if (id) {
            try {
                await commentDao.findCommentById(id, type, offset, limit).then((data) => {
                    if (!data.err) {
                        res.send(data);
                    } else {
                        res.send({
                            code: 400,
                            status: 0,
                            msg: ERR.DATASOURCE_ERR
                        });
                    }
                });
            } catch (err) {
                res.send({
                    code: 400,
                    status: 0,
                    msg: ERR.FIND_ERR
                })
            }
        } else {
            res.send({
                code: 0,
                status: 0,
                data: null
            })
        }
    }
}

const comment = new Comment();
exports.getCommentsById = comment.getCommentsById;
exports.createComment = comment.createComment;
