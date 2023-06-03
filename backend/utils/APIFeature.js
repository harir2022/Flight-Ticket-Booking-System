const { json } = require("express");

class APIFeatures{
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }

    // matches particular character or pattern 
    search(){
        const keyword = this.queryString.keyword ?{
            // checks field name with option of  case insensitive 
            airline:{
                $regex:new RegExp(this.queryString.keyword, 'i'),
                $options:'i' ,
            },                       
          }:{}
          
          this.query=this.query.find({...keyword});                
          return this;
    }

    
    filter(){
        let queryCopy ={...this.queryString};
        // console.log(queryCopy);
        const toBeRemoved=['keyword'];

        //handle unenterd fields
        Object.entries(queryCopy).forEach(([key, value]) => {
            if (!value) {
              delete queryCopy[key];
            }
          });

        toBeRemoved.forEach(el =>  delete queryCopy[el]);
        // console.log(queryCopy);

        //advance filter 
        let queryStr=JSON.stringify(queryCopy);
        // console.log(queryCopy)
        queryStr=queryStr.replace(/\b(gte|gt|lt|lte)\b/g , match=>`$${match}`)
        // console.log(queryCopy)

        queryStr = queryStr.replace(/\"([^"]+)\":\s*\"([^"]+)\"/g, '"$1": { "$regex": "$2", "$options": "i" }');

        // console.log(JSON.parse(queryStr ));
        

        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }    

    

    
}
module.exports=APIFeatures;