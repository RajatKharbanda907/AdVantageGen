const express = require("express")
const app = require("./app")


app.listen(process.env.PORT,process.env.HOST,(err)=>{
    if(err){
        console.log("err in starting the server"+err);
    }else{
        console.log(`server started successfully at http://${process.env.HOST}:${process.env.PORT}`);
    }
})