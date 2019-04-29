module.exports = (app) => {

    const answers = require('../controllers/app.Answercontroller.js');

    // Create a new Note
    app.post('/answers', answers.create);

    // Retrieve all Notes
    app.get('/answers', answers.findAll);

    // Retrieve a single Note with noteId
    app.get('/answers/:AnswerId', answers.findOne);

    // Update a Note with noteId
    app.put('/answers/:AnswerId', answers.update);

    // Delete a Note with noteId
    app.delete('/answers/:AnswerId', answers.delete);
}