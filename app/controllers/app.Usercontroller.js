const users = require('../models/app.Usermodel.js');
          
// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    /*if(!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }*/    

    // Create a Note
    const user = new users({
        UserID: 'bha11',
        Name:'Bharath',
        Email:'bkumar@gmail.com'
    });

    // Save Note in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Users."
        });
    });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    users.find()
    .then(allusers => {
        res.send(allusers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Users."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    users.findById(req.params.UserID)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.UserID
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.UserID
            });                
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.UserID
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
    users.findByIdAndUpdate(req.params.UserID, {        
        Name: "BharatKumar",
        Email:"bkumarn002@gmail.com"
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.noteId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    users.findByIdAndRemove(req.params.UserID)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.UserID
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.UserID
            });                
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.UserID
        });
    });
};