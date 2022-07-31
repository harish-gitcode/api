const router = require('express').Router();
const { getStudents, addStudent, deleteStudents } = require("../controller/student");


router.get("/studentdetails", getStudents);
router.post("/studentdetails", addStudent);
router.delete("/studentdetails", deleteStudents);

module.exports = router;