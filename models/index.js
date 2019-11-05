const mongoose = require('mongoose');
const User = require('./user');
const Service = require('./service');

const connectToDb = () => {
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);
	return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User, Service };

module.exports = {
	connectToDb,
	models
};
