const Student = require("../models/MainSchema");
const _ = require("lodash");

exports.getStudents = (req, res) => {
    let sclass = req.body.class;
    console.log(sclass);
    sclass.map(class=> {
        student.findOne({ Class: class})

    })
};

exports.addStudent = (req, res) => {
    Student.findOne({ AdmissionNumber: req.body.AdmissionNumber }, (err, student) => {
        if (err) return res.json(err);
        if (student) return res.status(403).json({ error: "Student with this AdmissionNumber exists" });
    });
    const student = new Student(req.body);
    student.save((err, usr) => {
        if (err) return res.json(err);
        // res.status(200).json({ message: "Singup success! Please login" }); //we can use json({user});
        const { Name, AdmissionNumber } = usr;
        return res.json({ Name, AdmissionNumber, status: "Successfully Registered" });
    });
};

exports.deleteStudents = (req, res) => {
    const students = Student.deleteMany({})
        .then((students) => {
            res.status(200).json({ students })
        })
        .catch(err => console.error(err));
}


exports.getProfile = (req, res) => {
    return res.json(req.profile);
}

exports.studentByid = (req, res, next, id) => {
    Student.findById(id).exec((err, student) => {
        if (err || !student) {
            return res.status(400).json({ error: "Student not found" });
        }
        req.profile = student; //add profile object in req  with student info
        next();
    });
};

exports.updateStudent = (req, res, next) => {
    let student = req.profile
    student = _.extend(student, req.body);

    student.save((err) => {
        if (err) return res.status(400).json({ error: "You are not authorized to update this user" });

        res.json({ student });
    });
}
exports.deleteStudent = (req, res) => {
    let student = req.profile;

    student.remove((err, user) => {
        if (err) return res.status(400).json({ err });

        res.json({ message: "Student deleted Successfully" });
    })
}