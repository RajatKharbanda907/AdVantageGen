const express = require("express")
const router = express.Router();
const {generateimage,uploadlogo,upload} = require("../controllers/userController")

router.post("/generate",generateimage)
router.post("/uploadlogo",upload.single("logo"),uploadlogo)
module.exports= router;