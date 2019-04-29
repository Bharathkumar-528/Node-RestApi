const answers = require('../models/app.Answermodel.js');
          
// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    /*if(!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }*/    

    // Create a Note
    const answer = new answers({
        AnswerId: "Ans1",
        USerID : "bha1",
        QuestionID : "Qts1",
        Answer:{ans1:"Ans1",ans2:"Ans2"},
        Upvote:"",
        Downvote:""
    });

    // Save Note in the database
    answer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the answers."
        });
    });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    answers.find()
    .then(allanswers => {
        res.send(allanswers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving answers."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    answers.findById(req.params.AnswerId)
    .then(answer => {
        if(!answer) {
            return res.status(404).send({
                message: "answers not found with id " + req.params.AnswerId
            });            
        }
        res.send(answer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Answer not found with id " + req.params.AnswerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Answer with id " + req.params.AnswerId
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
    answers.findByIdAndUpdate(req.params.AnswerId, {        
        Answer:{ans1:"Ans1",ans2:"Ans2",ans2:"Ans3"},
        Upvote:"",
        Downvote:""
    }, {new: true})
    .then(answer => {
        if(!answer) {
            return res.status(404).send({
                message: "answer not found with id " + req.params.AnswerId
            });
        }
        res.send(answer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "answer not found with id " + req.params.AnswerId
            });                
        }
        return res.status(500).send({
            message: "Error updating answer with id " + req.params.AnswerId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    answers.findByIdAndRemove(req.params.UserID)
    .then(answer => {
        if(!answers) {
            return res.status(404).send({
                message: "answer not found with id " + req.params.AnswerId
            });
        }
        res.send({message: "answer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "answer not found with id " + req.params.AnswerId
            });                
        }
        return res.status(500).send({
            message: "Could not answer User with id " + req.params.AnswerId
        });
    });
};