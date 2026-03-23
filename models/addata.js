const mongoose = require("mongoose")

const addataschema = mongoose.Schema({
    prompt:{type:String,required:true},
    imageurl:{type:String,required:true},
    campaign_name:{type:String,required:true},
    date_created:{type:Date,required:true,default:Date.now() },
    hashtags:{type:[String],required:true},
    captions:{type:String,required:true}
})

const addata = mongoose.model("addata",addataschema)
module.exports= addata