const connection = require('../database/connection');
const util = require("util"); // helper

module.exports= async(req,res,next)=>{
    const {token}=req.headers;
    
    const query = util.promisify(connection.query).bind(connection); 
    const user= await query('SELECT * FROM `user` WHERE `token`= ?',[token])
    if(user[0]){
        next()
    }else{
        res.json('You are not authorized to access this route');
    }
}
  