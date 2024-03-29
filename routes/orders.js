const express = require('express');
const router = express.Router();
const moment = require('moment');
const withAuth = require('./middleware');
const { Order, ExternalUser, Service } = require('../models').models;
const OrderTypes = require('../utils/orderTypes.constants');
const { ITEMS_PER_PAGE } = require('../utils/pageable.constants');

router.post('/', (req, res) => {
	const orderRequest = req.body;
	const isUserExternal = !orderRequest.userId;

	if (isUserExternal && !orderRequest.user)
		res.status(400).json({ error: 'External user data is not provided.' });

	Service.findOne({ _id: orderRequest.serviceId }, (err, service) => {
		if (err)
			sendInternalServerError(res);
		else if (!service)
			res.status(404).json({ error: 'Service not found.' });
		else {
			const isValid = validateOrder(orderRequest);
			if (!isValid)
				res.status(400).json({ error: 'Provided date is not valid or not appropriate for service working hours.' });
			else {
				const order = prepareOrderObject(service, orderRequest);
				if (isUserExternal)
					saveExternalUserAndOrder(orderRequest.user, order, res);
				else
					saveOrder(order, res);
			}
		}
	});
});

router.get('/', withAuth, (req, res) => {
	const type = req.query.type;
	const page = req.query.page ? req.query.page : 0;
	const userId = req.user._id;

	let filter = {};
	const now = moment().toDate();

	switch (type) {
		case OrderTypes.IN_PROGRESS:
			filter = { ...filter, startDate: { $lte: now }, endDate: { $gte: now } };
			returnOrders(page, filter, userId, res);
			break;
		case OrderTypes.PLANNED:
			filter = { ...filter, startDate: { $gte: now } };
			returnOrders(page, filter, userId, res);
			break;
		case OrderTypes.ARCHIVED:
			filter = { ...filter, endDate: { $lte: now } };
			returnOrders(page, filter, userId, res);
			break;
		default:
			res.status(200).json({ orders: [] });
			break;
	}
});

router.delete('/:id', withAuth, (req, res, next) => {
	const { id } = req.params;
	Order.findOne({ _id: id, userId: req.user._id }, (err, order) => {
		if (err)
			sendInternalServerError(res);
		else {
			if (!order)
				res.status(400).json({ error: `Order doesn\'t exist or you don\'t have permissions to delete it.` });
			else
				Order.deleteOne({ _id: order._id }, err => {
					if (err)
						sendInternalServerError(res);
					else
						res.status(200).json({ message: 'Order was successfully deleted' });
				});
		}
	});
});

const returnOrders = (page, filter, userId, res) => {
	getCountOfOrders(filter, userId, res)
		.exec((err, count) => {
			if (err)
				sendInternalServerError(res);
			else {
				Order.find(filter)
					.populate('serviceId', 'title price')
					.where('userId').equals(userId)
					.limit(ITEMS_PER_PAGE)
					.skip(ITEMS_PER_PAGE * page)
					.sort({ startDate: 'desc' })
					.exec((err, orders) => {
						if (err)
							sendInternalServerError(res);
						else {
							const pageCount = Math.ceil(count / ITEMS_PER_PAGE);
							res.status(200).json({ orders, pageCount });
						}
					});
			}
		});
};

const getCountOfOrders = (filter, userId) => {
	return Order.countDocuments(filter)
		.populate('serviceId', 'title price')
		.where('userId').equals(userId);
};

const validateOrder = order => {
	const { startDate } = order;
	const startOfOrderProcessing = moment(startDate);
	const isStartOfOrderProcessingBeforeTomorrow = startOfOrderProcessing.isSameOrBefore(moment().set('h', 23).set('m', 59).set('s', 59));
	const startOfWorkingDay = startOfOrderProcessing.set('h', 5).set('m', 30);
	const endOfWorkingDay = startOfOrderProcessing.set('h', 15).set('m', 0);

	return !(isStartOfOrderProcessingBeforeTomorrow ||
		startOfOrderProcessing.isBefore(startOfWorkingDay) ||
		startOfOrderProcessing.isAfter(endOfWorkingDay)
	);
};

const prepareOrderObject = (service, order) => {
	const { serviceId, userId, startDate } = order;
	const { leadTime } = service;

	const isUserExternal = !userId;
	const endDate = moment(startDate).add(leadTime, 'minutes').toDate();

	return { serviceId, userId, isUserExternal, startDate, endDate };
};

const saveExternalUserAndOrder = (user, order, res) => {
	const { email, name, surname, phone } = user;
	const externalUser = new ExternalUser({ email, firstName: name, lastName: surname, phoneNumber: phone });

	externalUser.save((err, user) => {
		if (err)
			res.status(500).json({ error: `Error saving external user with e-mail ${email}. Please, try again!` });
		else
			saveOrder({ ...order, userId: user.id }, res);
	});
};

const saveOrder = ({ serviceId, userId, isUserExternal, startDate, endDate }, res) => {
	const order = new Order({ serviceId, userId, isUserExternal, startDate, endDate });
	startDate = moment(startDate).toDate();
	endDate = moment(endDate).toDate();

	Order.find({ startDate: { $lte: endDate }, endDate: { $gte: startDate } }, (err, orders) => {
		if (err)
			sendInternalServerError(res);
		else if (orders && orders.length >= 3)
			res.status(400).json({ error: `Limit of orders our team can work on at the same time exceeded. Please, select another time.` });
		else
			order.save((err, order) => err ?
				res.status(500).json({ error: `Error ordering service ${serviceId}. Please, try again!` }) :
				res.status(201).json({ order })
			);
	});
};

const sendInternalServerError = (res) => {
	res.status(500).json({ error: 'Internal server error. Please, try again.' });
};

module.exports = router;
