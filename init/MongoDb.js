const mongoose = require('mongoose')

//database connection
const connectMongoDb = async () => {
    try {
        //connect database
       await mongoose
            .connect(process.env.DBCONNECTIONSTRING)
            .then(() => console.log('Database Connection Successful'))
    } catch (error) {
       console.log(error.message);
        process.exit(1)
    }
}

module.exports = connectMongoDb;
