const mongoose = require('mongoose');

const externalUserSchema = new mongoose.Schema({
	email: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	phoneNumber: { type: String, required: true }
});

const ExternalUser = mongoose.model('ExternalUser', externalUserSchema, 'users.external');

module.exports = ExternalUser;
