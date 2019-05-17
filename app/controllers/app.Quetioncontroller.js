const questions = require('../models/app.Quetionsmodel.js');
          
// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    /*if(!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty allow please add any data",
        });
    }*/ 

    console.log(req.body[0]["QuestionID"])

    //const question = new questions(req.body)

    // Create a question and answer
    const question = new questions({
        QuestionID: req.body[0]["QuestionID"],
        USerID : req.body[0]["USerID"],
        Question:req.body[0]["Question"],
        Answer : req.body[0]["Answer"],
        Upvote:req.body[0]["Upvote"],
        Downvote:req.body[0]["Downvote"]
    });

    /*const question = new questions({
        QuestionID: req.body.QuestionID,
        USerID : req.body.USerID,
        Question:req.body.Question,
        Answer : [],
        Upvote:"",
        Downvote:""
    });*/
    console.log(question);
    // Save question and answer in the database
    question.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the quetion."
        });
    });

};

// Retrieve and return all question and answer from the database.
exports.findAll = (req, res) => {
    questions.find()
    .then(allquestions => {
        res.send(allquestions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving questions."
        });
    });
};

// Find a single note with a questionid
exports.findOne = (req, res) => {
    questions.findById(req.params.QuestionID)
    .then(question => {
        if(!question) {
            return res.status(404).send({
                message: "questions not found with id " + req.params.QuestionID
            });            
        }
        res.send(question);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "questions not found with id " + req.params.QuestionID
            });                
        }
        return res.status(500).send({
            message: "Error retrieving questions with id " + req.params.QuestionID
        });
    });
};

// Update a note identified by the questionId in the request
exports.update = (req, res) => {
        // Validate Request
    /*if(!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }*/

    // Find note and update it with the request body
    questions.findByIdAndUpdate(req.params.QuestionID, {        
        Question:"Qts1 qts1",
        Answer:["",""],
        Upvote:"",
        Downvote:""
    }, {new: true})
    .then(question => {
        if(!question) {
            return res.status(404).send({
                message: "question not found with id " + req.params.QuestionID
            });
        }
        res.send(question);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "question not found with id " + req.params.QuestionID
            });                
        }
        return res.status(500).send({
            message: "Error updating question with id " + req.params.QuestionID
        });
    });
};

// Delete a note with the specified questionid in the request
exports.delete = (req, res) => {
    questions.findByIdAndRemove(req.params.QuestionID)
    .then(question => {
        if(!question) {
            return res.status(404).send({
                message: "question not found with id " + req.params.QuestionID
            });
        }
        res.send({message: "question deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "question not found with id " + req.params.QuestionID
            });                
        }
        return res.status(500).send({
            message: "Could not question User with id " + req.params.QuestionID
        });
    });
};