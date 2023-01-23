const http =require('http');
const app =require('./app');
const port = 5000;


const server = http.createServer(app);

const db = require("./models");
db.sequelize.sync()
.then(()=>{
    server.listen(port);
})
.catch()


