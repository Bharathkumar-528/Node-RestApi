const express = require('express');
const bodyParser = require('body-parser');
const path    = require("path");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

//require routes
require('./app/routes/app.Userroutes.js')(app);
require('./app/routes/app.Answerroutes.js')(app);
require('./app/routes/app.Quetionroutes.js')(app);

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});
  
app.get('/js/main.js',function(req,res){
    res.sendFile(path.join(__dirname+'/app/js/main.js'));
    //__dirname : It will resolve to your project folder.
});
  
app.get('/views/index',function(req,res){
    res.sendFile(path.join(__dirname+'/app/views/index.html'));
    //__dirname : It will resolve to your project folder.
});
  

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});