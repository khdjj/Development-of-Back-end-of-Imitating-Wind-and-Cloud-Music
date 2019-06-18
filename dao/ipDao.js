/*
 * @Descripttion: ip的操作方法
 * @version: 
 * @Author: khdjj
 * @Date: 2019-05-22 16:33:27
 * @LastEditors: khdjj
 * @LastEditTime: 2019-06-15 21:18:34
 */

let fs = require('fs');
readIp = function () {
    return new Promise((resolve,reject)=>{
        fs.readFile('./ip.txt', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let lists = [];
                let ipList = data.split(/\r\n/);
                ipList.forEach(function (item) {
                    lists.push(item.replace(/@HTTP#[\d]{0,6}\s[\u4e00-\u9fa5]{2}/, ''));
                });
                resolve(lists);
            }
        });
    })
}
let ipList = [];
exports.getIp =  async function(){
    if(!ipList[0]){
        ipList =  await readIp();
    }
     return ipList[parseInt(Math.random() * ipList.length)];
}