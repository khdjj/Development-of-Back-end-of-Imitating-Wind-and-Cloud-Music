/*
 * @Descripttion: 用于处理解析userId
 * @version: 
 * @Author: khdjj
 * @Date: 2019-07-27 20:50:36
 * @LastEditors: khdjj
 * @LastEditTime: 2019-08-04 17:00:06
 */

var dataEncPro = require('./encUserData');
module.exports = function(req){
    const {authorization} = req.headers;
    let userId= JSON.parse(dataEncPro.decData(authorization)).userId;
    return userId;
}