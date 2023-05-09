const router = require('express').Router();
const connection = require('../database/connection');
const auth=require('../middleware/authMiddleware');
const instructor=require('../middleware/instructorMiddlware')
const util = require("util"); 
const crypto = require("crypto"); 

const { body, validationResult } = require("express-validator");
const { query } = require('express');


//get enrolled students
router.get("/enrolledStudents",
body("code").isString().isLength({ min: 2, max: 20 }).withMessage("please enter a valid code!"),
async (req, res) => {
    const {id,code}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    const query = util.promisify(connection.query).bind(connection);
    const codeValidate=await query("SELECT * FROM `course` WHERE `code`=?",code);
        if(codeValidate!=0 ){

    connection.query("SELECT `id`as courseId FROM `course` WHERE ? ",{code:code}, (err, result, fields) => {
        if(err){
            res.send(err)
        }else{ 
                connection.query("SELECT studentId , grade FROM `studentcourse` WHERE ?",{courseId:result[0].courseId}, (err, result, fields) => {
                    if(err){
                        res.send(err)
                    }else{ 
                    res.send(result)
                    }
                })
        }
    });
}else{
    res.json("Wrong Id or Code")
}
});

//Set Grades for students for each course.

router.post("/setGrade",[auth,instructor],
body("studentId").isInt().withMessage("please enter a valid id!"),
body("courseCode").isString().isLength({ min: 2, max: 20 }).withMessage("please enter a valid code!"),
body("grade").isInt().withMessage("please enter a valid Grade!"),

async (req, res) => {
    const {studentId,courseCode,grade} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const query = util.promisify(connection.query).bind(connection);
    const idValidate=await query("SELECT * FROM `studentcourse` WHERE `studentId`=?",studentId);
    const codeValidate=await query("SELECT * FROM `course` WHERE `code`=?",courseCode);
    if(idValidate!=0 &&codeValidate!=0 ){

    connection.query("SELECT  `id` FROM `course` WHERE `code`=?",[courseCode],(err, result, fields) => {
        if(err){
            res.statusCode = 500;
            res.send(err)
        }else{
            const courseId=result[0].id
            connection.query("Update studentcourse set? where studentId= ? and courseId=?",
            [{grade:grade},studentId,courseId],(err, savedGrade, fields) => {
            if (err) {
                res.statusCode = 500;
                res.send({
                    message: "incorect data"
                })

            } else {
                res.json({
                    message: "grade saved !"
                })
            }
        })
        }
    });
}else{
    res.json("Wrong Student ID or Code")
}
    

});

module.exports = router;