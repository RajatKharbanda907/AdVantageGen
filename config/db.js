const mongoose = require("mongoose")
const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_DB)
    console.log("database connected succesfully");
} // this function  connect the database

module.exports=connectDB;