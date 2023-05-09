const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const admin = require("./routes/adminRoutes");
const instructor = require("./routes/instructorRoutes");
const student = require("./routes/studentRoutes");
const login = require("./auth/login");
const auth = require("./auth/register");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
   cors({
      origin: "*",
      methods: "*",
   })
);

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });



app.use("/admin", admin);
app.use("/", auth);
app.use("/", login);
app.use("/instructor", instructor);
app.use("/student", student);

app.listen(4000, "localhost", () => {
   console.log("SERVER IS RUNNING");
});
