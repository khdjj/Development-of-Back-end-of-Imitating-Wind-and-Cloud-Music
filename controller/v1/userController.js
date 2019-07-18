/*
 * @Descripttion: 对用户操作的处理
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-26 19:22:12
 * @LastEditors: khdjj
 * @LastEditTime: 2019-07-13 20:36:49
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
        this.improve = this.improve.bind(this);
        this.login = this.login.bind(this);
    }
    async register(req, res, next) {
        console.log(req.cookies.code);
        //判断验证码是否已过期
        if (!req.cookies.code) {
            res.send({
                code: 400,
                msg: ERR.COOKIE_TIME_OUT
            })
            return ;
        } else {
            const { email, pwd, code } = req.query;
            //判断验证码是否不正确
            if (code != req.cookies.code) {
                console.log("aaaaa");
                res.send({
                    code: 400,
                    msg: ERR.COOKIE_ERR
                });
                return;
            }
            console.log("验证码通过 ");
            let userId = UUID(8, 10);

            //判断邮箱是否已被注册
            let isRepeat = await dao.emailisAvailable(email);
            console.log(isRepeat);
            if(isRepeat){
                res.send({
                    code:400,
                    status:0,
                    msg:ERR.EMAIL_REGISTERED
                });
                return ;
            }
            //将userId存储在cookie中
            res.cookie('userId', userId, { maxAge: 600000, httpOnly: true });
            dao.insertUser(email, pwd, userId).then((data) => {
                console.log(data);
                if (!data) {
                    res.send({
                        code: 200,
                        msg: "注册成功",
                        userId:userId
                    })
                }
            })
        }
    }
    async updateAvatar(req, res, next) {
        if(!req.cookies.userId){
            res.send({
                code:400,
                msg:ERR.USER_ID_INVALID
            })
        }
        let userId = req.cookies.userId;
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
                        msg: ERR.ACCOUNT_EXIST
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
    async improve(req,res,next){
        if(!req.cookies.userId){
            res.send({
                code:400,
                msg:ERR.USER_ID_INVALID
            });
        }
        let userId = req.cookies.userId;

        console.log(userId);
        const {nickname,desc,sex} = req.body;
        console.log(req.body);
        try{
            dao.saveUsersData(nickname,desc,sex,userId).then(()=>{
                res.send({
                    code:200,
                    msg:"资料修改成功"
                })
            })
        }catch(err){
            res.send({
                code:400,
                msg:ERR.USER_DATA_SAVE_ERR
            })
        }
    }
    async login(req,res,next){
        const {email,pwd} = req.body;
        console.log(email,pwd);
        try{
            dao.loginUser(email,pwd).then((data)=>{
                console.log(data);
                if(data){
                    res.cookie('userId',data.userId,{maxAge:120000,httpOnly:true});
                    res.send({
                        code:200,
                        status:1,
                        userData:data
                    })
                }else{
                    res.send({
                        code:400,
                        status:0,
                        msg:ERR.LOGIN_ERR
                    })
                }
            })
        }catch(err){
            res.send({
                code:400,
                status:0,
                msg:data
            })
        }
    }
}

let user = new User();
exports.register = user.register;
exports.updateAvatar = user.updateAvatar;
exports.searchBynickname = user.searchBynickname;
exports.improve = user.improve;
exports.login = user.login;
