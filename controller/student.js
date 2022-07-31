const Student = require("../models/MainSchema");
const FeedbackDB = require("../models/feedback");
const _ = require("lodash");

exports.getStudents = async (req, res) => {
    let classes = req.body.class;
    const students = await Promise.all(
        classes.flatMap(async (_class) => {
            try {
                const data = await Student.find({ Class: _class });
                return data;
            } catch (e) {
                return [];
            }
        })
    );
    res.status(200).json(students);
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
exports.getFeedback = async (req, res, next) => {
    const feedbacks = req.profile.feedback;
    const Feedbacks = await Promise.all(
        feedbacks.flatMap(async (feedId) => {
            try {
                const data = await FeedbackDB.find({ _id: feedId });
                return data;
            } catch (e) {
                return [];
            }
        })
    );
    res.status(200).json(Feedbacks);
};

exports.postFeedback = async (req, res) => {
    const fb = new FeedbackDB(req.body);
    const newFeedbackID = fb._id;

    fb.save((err) => {
        if (err) res.status(400).json(err);
    });
    let student = req.profile;
    if (!student.feedback) student.feedback = [];
    const newStudent = {
        ...student,
        feedback: [...student.feedback, newFeedbackID],
    };
    student = _.extend(student, newStudent);
    student.save((err, student) => {
        if (err) return res.status(400).json(err);
        res.json({ student });
    });
};