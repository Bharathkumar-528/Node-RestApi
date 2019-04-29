const mongoose = require('mongoose');

const AnswerSchema = mongoose.Schema({
    AnswerId: String,
    USerID : String,
    QuestionID : String,
    Answer:Array,
    Upvote:String,
    Downvote:String
}, {
    timestamps: true
});
module.exports = mongoose.model('Answers', AnswerSchema);