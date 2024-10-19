const mongoose = require("mongoose");
const { DbConnectionString } = require("./keys");

//database connection
const connectMongoDb = async () => {
  try {
    //connect database
    await mongoose
      .connect(DbConnectionString)
      .then(() => console.log("Database Connection Successful"));
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectMongoDb;
