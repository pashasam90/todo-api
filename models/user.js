const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true, trim: true, lowercase: true},
    password: {type: String, required: true, minLength: 6}
});

const User = mongoose.model('Users', userSchema);

module.exports = User;