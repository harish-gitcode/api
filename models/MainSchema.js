const mongoose = require('mongoose');

const Feedback = new mongoose.Schema({
    Feedback: [],
    StarRating: Number
});


const studentSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: true,
        trim: true
    },
    AdmissionNumber: {
        type: Number,
        require: true,
    },
    Class: String,
    Marks: [String],
    feedback: [Feedback]
});


module.exports = mongoose.model("Student", studentSchema);