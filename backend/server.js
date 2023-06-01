const app = require('./app');
const dotenv=require('dotenv');


dotenv.config({path:'backend/config/config.env'});

const connectDatabase = require("./config/database");
process.on('uncaughtException',err=>{
     console.log("Error:"+err.message);
     console.log(`SHUTTING DOWN DUE TO UNCAUGHT EXCEPTION`);//undefined in server.js
     process.exit(1);
 })



 
 connectDatabase();
 const server = app.listen(process.env.PORT,()=>{
     console.log(`working on the ${process.env.PORT} + ${process.env.NODE_ENV} MODE  `);
 })
process.on('unhandledRejection',(err)=>{
     console.log("SHUTTING DOWN DUE TO UNHANDLED PROMISE REJECTION")//db erro;
     console.log('Error:'+err.message);
     server.close(
          ()=>process.exit(1)
     )
});