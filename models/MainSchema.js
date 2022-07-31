const mongoose = require('mongoose');

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
    feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
});

module.exports = mongoose.model("Student", studentSchema);