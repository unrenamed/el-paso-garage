const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALT_ROUNDS);

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    age: { type: Number }
});

userSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
           if (err) {
               next(err);
           } else {
               document.password = hashedPassword;
               next();
           }
        });
    } else {
        next();
    }
});

userSchema.methods.isCorrectPassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, same) => {
       if (err) {
           callback(err);
       } else {
           callback(err, same);
       }
    });
};

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
