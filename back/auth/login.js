const router = require('express').Router();
const app = require('express');
const connection = require('../database/connection');
const bcrypt=require('bcryptjs');
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper



router.post("/login", 
body("email").isEmail().withMessage("please enter a valid email!"),
body("password")
.isLength({ min: 3, max: 12 })
.withMessage("password should be between (3-12) character"),
async(req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    const query = util.promisify(connection.query).bind(connection); // transform query mysql --> promise to use [await/async]

    const {email,password} = req.body;

    
    await query("SELECT * FROM user WHERE email= ?",[email],async(err,result)=>{
        
        

        if(err){
            console.log(err);
        }

        if(result[0].email==null){
            // return res.render('register',{
            //     message:"There is no email matches, please regester first!";
            // })

                            res.json({
                                message: "There is no email matches, please regester first!"
                            })}

        else{ await bcrypt.compare(password,result[0].password, function(err, hash) {
            if (err) { throw (err); }
        // 
        else if(!hash){
            // return res.render('login',{
            //     message:"Password doesn't match!";
            // })

            res.json({
                message: "Password doesn't match!"
            })
        }else{
            delete result[0].password;
            res.json(result[0])
        }
    

    });

        }
        });
        });


module.exports = router;