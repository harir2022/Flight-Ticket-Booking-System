const mongoose = require('mongoose');

const createConnection = ()=>{
     mongoose
          .connect(process.env.DB_PROD_URI,{
               useNewUrlParser: true,
               useUnifiedTopology: true
          })
          .then(()=>console.log('Database Connection established successfully'))
          
}

module.exports = createConnection;