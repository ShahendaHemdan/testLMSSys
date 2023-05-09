const router = require("express").Router();
const connection = require("../database/connection");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const util = require("util");
const crypto = require("crypto");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const {
   default: BaisUrl,
} = require("../../front/src/BaisUrl");

// CRUD on COURSE
router.use(
   cors({
      origin: "*",
      methods: "*",
   })
);

//get all courses
router.get("/allCourses", (req, res) => {
   connection.query("SELECT * FROM `course`", (err, result, fields) => {
      if (err) {
         res.statusCode = 500;
         res.send({
            message: "Failed to save the cousre",
         });
      } else {
         res.send(result);
      }
   });
});

// Get request => get a specific course
router.get("/showCourse/:id", [admin, auth], (req, res) => {
   const { id } = req.params;
   connection.query(
      "select * from course where ?",
      { id: id },
      (err, result, fields) => {
         if (result[0]) {
            res.json(result[0]);
         } else {
            res.statusCode = 404;
            res.json({
               message: "course not found",
            });
         }
      }
   );
});

// Post request => save a course
router.post(
   "/addCourse",
   [admin, auth],
   body("name")
      .isString()
      .isLength({ min: 4, max: 20 })
      .withMessage("please enter a valid name!"),
   body("code")
      .isString()
      .isLength({ min: 2, max: 20 })
      .withMessage("please enter a valid code!"),
   body("status")
      .isString()
      .isLength({ min: 5, max: 20 })
      .withMessage("please enter a valid status!"),
   async (req, res) => {
      const courseData = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json(errors);
      }
      const query = util.promisify(connection.query).bind(connection);
      const validCource = await query(
         "SELECT * FROM course WHERE code=? and name=?",
         [courseData.code, courseData.name]
      );
      if (validCource.length==0) {
         connection.query(
            "INSERT INTO `course` set ?",
            {
               name: courseData.name,
               code: courseData.code,
               status: courseData.status,
            },
            (err, result, fields) => {
               if (err) {
                  res.statusCode = 500;
                  res.send({
                     message: "Failed to save the cousre",
                  });
               } else {
                  res.json({
                     message: "course created !",
                  });
               }
            }
         );
      } else {
         res.json("This Course is already exist");
      }
   }
);
// Put request => modify a specific movie
router.put(
   "/updateCourse/:id",

   body("name")
      .isString()
      .isLength({ min: 3, max: 255 })
      .withMessage("please enter a valid name!"),
   body("code")
      .isString()
      .isLength({ min: 2, max: 255 })
      .withMessage("please enter a valid code!"),
   body("status")
      .isString()
      .isLength({ min: 5, max: 255 })
      .withMessage("please enter a valid status!"),
   async (req, res) => {
      const { id } = req.params;
      const courseData = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json(errors);
      }
      const query = util.promisify(connection.query).bind(connection);
      const validCource = await query("SELECT * FROM course WHERE id=?", id);
      if (validCource.length != 0) {
         connection.query(
            "update course set ? where id = ?",
            [
               {
                  name: courseData.name,
                  code: courseData.code,
                  status: courseData.status,
               },
               id,
            ],
            (err, result) => {
               if (err) {
                  res.statusCode = 505;
                  res.json({
                     message: "Failed to update the course",
                  });
               } else {
                  res.json({
                     message: "course updated successfully",
                  });
               }
            }
         );
      } else {
         res.json("There is no such course");
      }
   }
);

// Delete request => delete a course
router.delete("/deleteCourse/:id", [admin, auth], (req, res) => {
   const { id } = req.params;
   connection.query("delete from course where ?", { id: id }, (err, result) => {
      if (err) {
         res.statusCode = 500;
         res.json({
            message: "failed to delete the course",
         });
      }
      res.json({
         message: "course deleted successfully",
      });
   });
});

// CRUD on INSTRUCTOR

//get all instrctors
router.get("/allInstrctors", [admin, auth], (req, res) => {
   connection.query(
      "SELECT * FROM `user` where role= ?",
      ["instructor"],
      (err, result, fields) => {
         res.send(result);
      }
   );
});

// Post request => save an instrctor
router.post(
   "/addInstrctor",
   [admin, auth],

   body("fName")
      .isString()
      .isLength({ min: 4, max: 20 })
      .withMessage("please enter a valid Name!"),
   body("lName")
      .isString()
      .isLength({ min: 2, max: 20 })
      .withMessage("please enter a valid Name!"),
   body("email")
      .isEmail()
      .isLength({ min: 5, max: 20 })
      .withMessage("please enter a valid Email!"),
   body("phone")
      .isString()
      .isLength({ min: 5, max: 20 })
      .withMessage("please enter a valid Phone Number!"),
   body("status")
      .isString()
      .isLength({ min: 4, max: 20 })
      .withMessage("please enter a valid Status!"),
   body("password")
      .isLength({ min: 3, max: 12 })
      .withMessage("password should be between (3-12) character"),
   async (req, res) => {
      const instructoreData = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json(errors);
      }

      let hashedPassword = await bcrypt.hash(instructoreData.password, 10);
      //  CHECK IF EMAIL EXISTS
      const query = util.promisify(connection.query).bind(connection);
      const validInstructor = await query(
         "SELECT * FROM `user` WHERE `email`=? AND role=?",
         [instructoreData.email, "instructor"]
      );
      if (validInstructor.length == 0) {
         connection.query(
            "INSERT INTO user set ?",
            {
               fName: instructoreData.fName,
               lName: instructoreData.lName,
               email: instructoreData.email,
               password: hashedPassword,
               phone: instructoreData.phone,
               status: instructoreData.status,
               role: "instructor",
               token: crypto.randomBytes(16).toString("hex"),
            },
            (err, result, fields) => {
               if (err) {
                  res.statusCode = 500;
                  res.send({
                     message: "Failed to save the Instrctor",
                  });
               } else {
                  res.json({
                     message: "Instrctor created !",
                  });
               }
            }
         );
      } else {
         res.json("This instructor already exists");
      }
   }
);

// Get request => get a specific course
router.get("/showInstructor/:id", [admin, auth], (req, res) => {
   const { id } = req.params;
   connection.query(
      "select * from user where id=? and role=?",
      [id, "instructor"],
      (err, result, fields) => {
         if (result[0]) {
            res.json(result[0]);
         } else {
            res.statusCode = 404;
            res.json({
               message: "instructor not found",
            });
         }
      }
   );
});
// Put request => modify a specific instrctor

router.put("/updateInstrctor/:id",
    body("fName").isString().isLength({ min: 2, max: 20 }).withMessage("please enter a valid Name!"),
    body("lName").isString().isLength({ min: 2, max: 20 }).withMessage("please enter a valid Name!"),
    body("email").isEmail().isLength({ min: 5, max: 20 }).withMessage("please enter a valid Email!"),
    body("phone").isString().isLength({ min: 5, max: 20 }).withMessage("please enter a valid Phone Number!"),
    body("status").isString().isLength({ min: 4, max: 20 }).withMessage("please enter a valid Status!"),
    body("password").isLength({ min: 3, max: 12 }).withMessage("password should be between (3-12) character"),

    [admin,auth], async(req, res) => {
    const { id } = req.params;
    const instructoreData = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    const query = util.promisify(connection.query).bind(connection);
    let hashedPassword=await bcrypt.hash(instructoreData.password,10);

    const validate=await query("SELECT * FROM `user` WHERE `id`=? AND`role`=?",[id,"instructor"]);
    if (validate.length!=0){
    connection.query("update user set ? where id = ?",
        [ {
            fName: instructoreData.fName,lName: instructoreData.lName,
            email:instructoreData.email ,password: hashedPassword,
            phone:instructoreData.phone,status:instructoreData.status,
            role:'instructor'
        }, id], (err, result) => {
            if (err) {
                res.statusCode = 505;
                res.json({
                    message: "Failed to update the Instrctor"
                });
            } else {
                res.json({
                    message: "Instrctor updated successfully"
                });
            }
        });
    }else{
        res.json("There is no instructor matches this id ")
    }
    });
// Delete request => delete a instrctor
router.delete("/deleteInstrctor/:id", [admin, auth], (req, res) => {
   const { id } = req.params;
   connection.query(
      "delete from user where id= ? AND role= ?",
      [id, "instructor"],
      (err, result) => {
         if (err) {
            res.statusCode = 500;
            res.json({
               message: "failed to delete the Instrctor",
            });
         }
         res.json({
            message: "Instrctor deleted successfully",
         });
      }
   );
});

//Assign Instructors to Courses

router.post("/assignInstrctor", [admin, auth], async (req, res) => {
   const instructoreData = req.body;
   const query = util.promisify(connection.query).bind(connection);
   const validate = await query(
      "SELECT * FROM `instructorcourse` WHERE `instructorId`=? AND`courseId`=?",
      [instructoreData.instructorId, instructoreData.courseId]
   );
   if (validate.length == 0) {
      connection.query(
         "INSERT INTO instructorcourse set ?",
         {
            instructorId: instructoreData.instructorId,
            courseId: instructoreData.courseId,
         },
         (err, result, fields) => {
            if (err) {
               res.statusCode = 500;
               res.send({
                  message: "Failed to assigne to course",
               });
            } else {
               res.json({
                  message: "Instrctor assigned to course !",
               });
            }
         }
      );
   } else {
      res.json("This instructor alreay assigned to this course");
   }
});

module.exports = router;
