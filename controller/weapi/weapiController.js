/*
 * @Descripttion:对搜索功能的操作
 * @version: 
 * @Author: khdjj
 * @Date: 2019-06-26 15:03:05
 * @LastEditors: khdjj
 * @LastEditTime: 2019-07-20 17:24:06
 */

let chalk = require('chalk'),
    spider = require('../../spider/searchSpider');

const  ERR = require('../../errorResource');

class Weapi {

    constructor() {
      this.getSearchData = this.getSearchData.bind(this);
    }

    getSearchData(req,res,next){
        const {type,s,limit,offset} = req.body;
        console.log(type,s,limit,offset) ;
        try{
            spider.search(type,s,limit,offset).then((data)=>{
                console.log(data);
                res.send(data);
            })
        }catch(err){
            res.send({
                code:400,
                status:0,
                msg:ERR.SEARCH_ERROR
            })
        }
     
    }

}

const weapi = new Weapi();
exports.getSearchData = weapi.getSearchData;
