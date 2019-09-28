const mongoose = require('mongoose');
const User = require('./user');

const connectToDb = () => {
    return mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

const models = { User };

module.exports = {
    connectToDb,
    models
};
