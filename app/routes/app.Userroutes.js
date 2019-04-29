module.exports = (app) => {

    const users = require('../controllers/app.Usercontroller.js');

    // Create a new Note
    app.post('/users', users.create);

    // Retrieve all Notes
    app.get('/users', users.findAll);

    // Retrieve a single Note with noteId
    app.get('/users/:UserID', users.findOne);

    // Update a Note with noteId
    app.put('/users/:UserID', users.update);

    // Delete a Note with noteId
    app.delete('/users/:UserID', users.delete);
}