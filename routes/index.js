let discover = require('./discover');
export default app=>{
    app.use('/discover',discover);
}