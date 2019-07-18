/*
 * @Descripttion: 对获取验证码的请求处理
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-26 15:03:05
 * @LastEditors: khdjj
 * @LastEditTime: 2019-07-12 21:02:38
 */

let nodemailer = require('nodemailer'),
    chalk = require('chalk'),
    ERR = require('../../errorResource')
conf = require('../../config/default');
class Capchas {

    constructor() {
        this.getCapchas = this.getCapchas.bind(this);
        this.mailTransport = nodemailer.createTransport({
            service: 'qq',
            auth: {
                user: conf.email.auth.user,
                pass: conf.email.auth.pass
            }
        });
    }

    getCapchas(req, res, next) {
        console.log(req.cookies);
        // let { email } = req.query;
        let code = parseInt(Math.random() * 800000 + 100000);
        res.cookie('code',code,{maxAge:120000,httpOnly:true});
        console.log(code);
        // try{
        //     this.mailTransport.sendMail({
        //         from:conf.email.host,
        //         to:email,
        //         subject:'仿网易云音乐网站验证码',
        //         text: `您在仿网易云音乐中注册的验证码是:${code}`
        //     },function(err,info){
        //         if(err){
        //             console.log(chalk.red(err));
        //             res.send({
        //                 code:400,
        //                 msg:ERR.GET_CAP
        //             })
        //         }else{
        //             res.send({
        //                 code:200,
        //                 msg:'验证码已发送至您的邮箱，请注意查收'
        //             })
        //         }
        //     });
        res.send({
            code: 200,
            msg: '验证码已发送至您的邮箱，请注意查收'
        })
    } catch(err) {
        res.send({
            code: 400,
            msg: ERR.GET_CAP
        })
    }
}

let capchas = new Capchas();
exports.getCapchas = capchas.getCapchas;