const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/CollegeController");
const internController = require("../controllers/internController");

router.post("/functionup/colleges", collegeController.createCollege)
router.post("/functionup/interns", internController.createIntern)


module.exports = router;