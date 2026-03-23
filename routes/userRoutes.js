const express = require("express")
const router = express.Router();
const {generateimage,uploadlogo,upload,savedata} = require("../controllers/userController")

router.post("/generate",generateimage)
router.post("/uploadlogo",upload.single("logo"),uploadlogo)
router.post("/save",savedata);
module.exports= router;