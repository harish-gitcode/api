const router = require("express").Router();
const { studentByid, getProfile, updateStudent, deleteStudent } = require("../controller/student");

router.param("id", studentByid);
router.get("/studentdetails/:id", getProfile);
router.put("/studentdetails/:id", updateStudent);
router.delete("/studentdetails/:id", deleteStudent);
module.exports = router