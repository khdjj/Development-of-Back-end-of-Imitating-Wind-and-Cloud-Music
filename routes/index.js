let routerDiscover = require('./discover'),
    routerV1 = require('./v1');

exports.routes = app=>{
    app.use('/discover',routerDiscover.router);
    app.use('/v1',routerV1.router);
}