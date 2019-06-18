let superagent = require('superagent'),
    ipDao = require('./dao/ipDao');
require('superagent-proxy')(superagent);

let get = function(ip){
    superagent
    .get("www.baidu.com")
    .proxy(`http://${ip}`)
    .set({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://music.163.com',
        'Referer': 'https://music.163.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
    }).end(function (err, res) {
        if (err) {
            console.log("请求错误");
            console.log(err);
            if(err.errno == 'ETIMEDOUT'){
                ipDao.getIp().then((data)=>{
                    console.log(data);
                    get(data);
                });  
            }
        } else {
            console.log("ok");
        }
    });
}
get('103.70.204.65:46351');

module.exports = {
    get
}




