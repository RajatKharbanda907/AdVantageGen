const express = require("express")
const app = express();
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
require("./config/env")
connectDB();
app.use("/uploads",express.static("uploads"))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/user",userRoutes)
module.exports= app;
