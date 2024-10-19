const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
dotenv.config();
const connectMongoDb = require("./init/MongoDb");
const todoRouter = require("./routes/todoRouter");

//connect Database
connectMongoDb();

//set view engine
app.set("view engine", "ejs");
//serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));
//serve static files from node_modules
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/@popperjs/core/dist/umd"))
);
app.use(bodyParser.urlencoded({ extended: true }));
//use todoRouter
app.use("/", todoRouter);

module.exports = app;
