const questions = require('../models/app.Quetionsmodel.js');
          
// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    /*if(!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }*/    

    // Create a Note
    const question = new questions({
        QuestionID: "Qts1",
        USerID : "bha1",
        AnswerId : "Ans1",
        Question:"Qts1",
        Upvote:"",
        Downvote:""
    });

    // Save Note in the database
    question.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the quetion."
        });
    });

};

// Retrieve and return all notes from the database.
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

// Find a single note with a noteId
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

// Update a note identified by the noteId in the request
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

// Delete a note with the specified noteId in the request
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