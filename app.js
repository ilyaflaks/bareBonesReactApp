require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const AppError = require("./utils/appError");
const errorController = require("./utils/errorController");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const mysql = require("mysql");

//CORS only needed to test the front end on port 3000
//This allows one to make changes and test them out without having to run 'npm run-script build' every time
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
//   optionSuccessStatus: 200,
// };
//app.use(cors(corsOptions));

app.use(express.static("client/build"));

app.use(cookieParser());
app.use(express.json());

/////
////ONLY RUN THIS ONCE AND THEN DELETE
////Alternatively, create the table manually in phpmyadmin using the provided structure and delete the below code anyway
/////
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "testdb",
// });

// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("MySQL Connected");
// });

// app.get("/createdb", (req, res) => {
//   let sql = "CREATE DATABASE testdb";
//   db.query(sql, (err) => {
//     if (err) {
//       throw err;
//     }
//     res.send("Database created");
//   });
// });

// app.get("/createregistration", (req, res) => {
//   console.log("createregistration route accessed");
//   let sql =
//     "CREATE TABLE registration(id int AUTO_INCREMENT, userName VARCHAR(50), email VARCHAR(50), password VARCHAR(150),dateRegistered DATE DEFAULT (CURRENT_DATE()), PRIMARY KEY(id), CONSTRAINT unique_email UNIQUE (email))  ";
//   db.query(sql, (err) => {
//     if (err) {
//       console.log("err: ", err);
//       throw err;
//     }
//     console.log("no err ");

//     res.send("User table created");
//   });
// });
////

app.use("/api/users", userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use(errorController);

app.listen(process.env.APP_PORT, () => {
  console.log("Sever running on port: ", process.env.APP_PORT);
});
