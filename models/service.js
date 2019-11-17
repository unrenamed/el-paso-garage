const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
	titleId: { type: String, required: true, unique: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	type: { type: String, required: true },
	price: { type: Number, required: true },
	leadTime: { type: Number, required: true }
});

const Service = mongoose.model('Service', serviceSchema, 'services');

module.exports = Service;
