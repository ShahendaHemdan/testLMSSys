const router = require('express').Router();
const connection = require('../database/connection');
const auth=require('../middleware/authMiddleware');
const util = require("util"); // helper


//Post request=>Student Register courses    

router.post("/registerCourse",auth, async(req, res) => {
    const registerData = req.body;
    const {code}=req.body;
    const {token}=req.headers;
    const query = util.promisify(connection.query).bind(connection); // transform query mysql --> promise to use [await/async]

    await query("select id from user where token=?",token,async (err, studentId, fields) => {
        if(err){
            res.json(err)
        }else{
            await query("SELECT `id` FROM `course` WHERE ?",{code:registerData.code}, async(err, courseId, fields) => {
                if (err) {
                    result.statusCode = 500;
                    res.send({
                        message: "Failed to find the cousre"
                    })

                }else{
                
                    const regesterd=await query("SELECT * FROM `studentcourse` WHERE `courseId`=?",courseId);
                    if(!regesterd){
                    await query("INSERT INTO `studentcourse` set ?",
                        {studentId:studentId[0].id,courseId:courseId[0].id},
                        (err, result, fields) =>{
                            if (err) {
                                res.statusCode = 500;
                                res.send({
                                    message: "Failed to register the cousre"
                                })

                            } else {
                                res.json({
                                    message: "course registered !"
                                })
                }
            })
                    }else{
                        res.json("this course is already registred ")
                    }
                }


        });
    }
});
    

});


//GET request=>Student Registerd courses with grades


router.get("/showCouresewithGrades",auth, async (req, res) => {
    const {token}=req.headers;
connection.query("select id from user where token=?",token, (err, result, fields) => {
    if(err){
        res.json(err)
    }else{
        connection.query("SELECT course.name as courseName ,course.code,studentcourse.grade FROM `studentcourse` INNER JOIN course on course.id=studentcourse.courseId where studentId= ?",[result[0].id], (err, result, fields) => {
            if (err) {
                res.statusCode = 500;
                res.send({err
                    //message: "Failed to find  the student"
                })
                
            }
            else{
                    res.send(result)

} })
    }
    
})

                            })

module.exports = router;