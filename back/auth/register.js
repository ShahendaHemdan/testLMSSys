const router = require('express').Router();
const connection = require('../database/connection');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const util = require("util");
const crypto = require("crypto"); 
const { body, validationResult } = require("express-validator");


router.post("/register",
body("email").isEmail().withMessage("please enter a valid email!"),
  body("fName")
    .isString()
    .withMessage("please enter a valid name")
    .isLength({ min: 4, max: 20 })
    .withMessage("name should be between (4-20) character"),
  body("password")
    .isLength({ min: 3, max: 12 })
    .withMessage("password should be between (3-12) character"),

    async(req, res) => {
    // 1- VALIDATION REQUEST [manual, express validation]
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const query = util.promisify(connection.query).bind(connection); // transform query mysql --> promise to use [await/async]

    const {fName,lName,email,password,confiremPassword,phone} = req.body;


        await query("SELECT email FROM user WHERE email= ?",[email],async(err,result)=>{
        if(err){
            res.send(err);
        }
        if(result.length>0){
            // return res.render('register',{
            //     message:"this email is already in use";
            // })

                            res.json({
                                message: "this email is already in use !"
                            })
        }else if (password!=confiremPassword){
            // return res.render('register',{
            //     message:"Passwords don't match!";
            // })

            res.json({
                message: "Passwords don't match!"
            })
        }

        let hashedPassword=await bcrypt.hash(password,10);
        connection.query("INSERT INTO `user` set ?",
        {   fName:fName,lName:lName,email:email,
            password:hashedPassword,
            phone:phone,role:'student',
            token: crypto.randomBytes(16).toString("hex"),
        
        },
        (err, result, fields) => {
            if (err) {
                result.statusCode = 500;
                res.send({
                    message: "Failed to save the account"
                })

            } else {
                res.json({
                    message: "account created !"
                })
            }
        });
    })

    

});

module.exports = router;