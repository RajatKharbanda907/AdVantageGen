const express = require("express")
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
require("./config/env")
connectDB();
app.use(cors());
app.use("/uploads",express.static("uploads"))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/user",userRoutes)
module.exports= app;
