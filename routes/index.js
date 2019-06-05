let routerDiscover = require('./discover');
console.log("index");
exports.routes = app=>{
    app.use('/discover',routerDiscover.router);
}