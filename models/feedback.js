const mongoose = require("mongoose");

const Feedback = new mongoose.Schema({
    feedback: String,
    StarRating: Number,
});

module.exports = mongoose.model("Feedback", Feedback);