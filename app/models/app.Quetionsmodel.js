const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    QuestionID: String,
    USerID : String,
    AnswerId : String,
    Question:String,
    Upvote:String,
    Downvote:String
}, {
    timestamps: true
});
module.exports = mongoose.model('Questions', QuestionSchema);