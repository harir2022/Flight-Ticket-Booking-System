module.exports = func =>(req,res,next)=>{
     return Promise.resolve(func(req,res,next))
             .catch(next);    
 }

 // error that occurrs during request body , etc . but it is required .
 //avoid using try catch block again and again .