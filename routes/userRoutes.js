const express = require("express")
const router = express.Router();
const {generateimage, uploadlogo, upload, savedata, getCampaigns} = require("../controllers/userController")

router.post("/generate", generateimage)
router.post("/uploadlogo", upload.single("logo"), uploadlogo)
router.post("/save", savedata)
router.get("/campaigns", getCampaigns)
module.exports = router;