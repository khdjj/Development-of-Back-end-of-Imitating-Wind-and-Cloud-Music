let routerDiscover = require('./discover');
console.log("index");
exports.routes = app=>{
    app.use('/discover',routerDiscover.router);
    app.get('/aaa',function(req,res,next){
        res.send('aaa');
        next();
    })
}