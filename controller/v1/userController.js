/*
 * @Descripttion: 对用户操作的处理
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-26 19:22:12
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-28 21:44:40
 */

const ERR = require('../../errorResource');
let dao = require('../../dao/userDao'),
    getpath = require('../../service/getpath'),
    UUID = require('../../service/getUUID');

class User {
    constructor() {
        this.register = this.register.bind(this);
        this.updateAvatar = this.updateAvatar.bind(this);
        this.searchBynickname = this.searchBynickname.bind(this);
        this.login = this.login.bind(this);
    }
    async register(req, res, next) {
        console.log(req.cookies.code);
        if (!req.cookies.code) {
            res.send({
                code: 400,
                msg: ERR.COOKIE_TIME_OUT
            })
        } else {
            const { email, pwd, code } = req.query;
            if (code != req.cookies.code) {
                res.send({
                    code: 400,
                    msg: ERR.COOKIE_ERR
                });
            }
            let userId = UUID(8, 10);
            res.cookie('userId', userId, { maxAge: 600000, httpOnly: true });
            dao.insertUser(email, pwd, userId).then((data) => {
                console.log(data);
                if (!data) {
                    res.send({
                        code: 200,
                        msg: "注册成功"
                    })
                }
            })
        }
    }
    async updateAvatar(req, res, next) {
        // if(!req.cookies.userId){
        //     res.send({
        //         code:400,
        //         msg:ERR.USER_ID_INVALID
        //     })
        // }
        let userId = '28560503';
        let imgpath = await getpath(req, res);
        try {
            dao.updateAvatar(userId, imgpath).then(() => {
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
    async searchBynickname(req, res, next) {
        const { nickname } = req.query;
        if (!nickname) {
            res.send({
                code: 400,
                msg: PARAMS_ERR
            })
        }
        try {
            dao.searchBynickname(nickname).then((data) => {
                console.log(data);
                if (data[0]) {
                    res.send({
                        code: 200,
                        status: 0,
                        msg: "用户名已存在"
                    })
                } else {
                    res.send({
                        code: 200,
                        status: 1,
                        msg: "用户名不存在"
                    })
                }
            })
        } catch (err) {
            res.send({
                code: 400,
                msg: ERR.FIND_ERR
            });
        }
    }
    async login(req,res,next){
        // if(!req.cookies.userId){
        //     res.send({
        //         code:400,
        //         msg:ERR.USER_ID_INVALID
        //     });
        // }
        let userId = '28560503';
        const {nickname,desc,sex} = req.body;
        console.log(req.body);
        try{
            dao.saveUsersData(nickname,desc,sex,userId).then(()=>{
                res.send({
                    code:200,
                    msg:"注册成功"
                })
            })
        }catch(err){
            res.send({
                code:400,
                msg:ERR.USER_DATA_SAVE_ERR
            })
        }
      
    }
}

let user = new User();
exports.register = user.register;
exports.updateAvatar = user.updateAvatar;
exports.searchBynickname = user.searchBynickname;
exports.login = user.login;