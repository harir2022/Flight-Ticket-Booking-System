const mongoose = require('mongoose');

const createConnection = ()=>{
     mongoose
          .connect(process.env.DB_LOC_URI)
          .then(()=>console.log('Database Connection established successfully'))
          
}

module.exports = createConnection;