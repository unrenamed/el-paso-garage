const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
	serviceId: { type: ObjectId, required: true },
	userId: { type: ObjectId, required: true },
	isUserExternal: { type: Boolean, required: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true }
});

const Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;
