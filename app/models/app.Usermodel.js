const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    UserID: String,
    Name : String,
    Email : String
}, {
    timestamps: true
});
module.exports = mongoose.model('Users', UserSchema);