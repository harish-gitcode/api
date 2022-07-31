const router = require("express").Router();
const { studentByid, getProfile, updateStudent, deleteStudent, getFeedback, postFeedback } = require("../controller/student");

router.param("id", studentByid);
router.get("/studentdetails/:id", getProfile);
router.put("/studentdetails/:id", updateStudent);
router.delete("/studentdetails/:id", deleteStudent);
router.get("/studentdetails/:id/feedback", getFeedback);
router.post("/studentdetails/:id/feedback", postFeedback)

module.exports = router