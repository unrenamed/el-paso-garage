const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String},
    age: { type: Number }
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
