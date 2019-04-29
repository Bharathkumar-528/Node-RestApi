module.exports = (app) => {

    const questions = require('../controllers/app.Quetioncontroller.js');

    // Create a new Note
    app.post('/questions', questions.create);

    // Retrieve all Notes
    app.get('/questions', questions.findAll);

    // Retrieve a single Note with noteId
    app.get('/questions/:QuestionID', questions.findOne);

    // Update a Note with noteId
    app.put('/questions/:QuestionID', questions.update);

    // Delete a Note with noteId
    app.delete('/questions/:QuestionID', questions.delete);
}