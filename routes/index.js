let routerDiscover = require('./discover');
exports.routes = app=>{
    app.use('/discover',routerDiscover.router);
}