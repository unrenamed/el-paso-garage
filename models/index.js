const mongoose = require('mongoose');
const User = require('./user');
const Service = require('./service');
const Order = require('./order');
const ExternalUser = require('./externalUser');

const connectToDb = () => {
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);
	return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User, Service, Order, ExternalUser };

module.exports = {
	connectToDb,
	models
};
