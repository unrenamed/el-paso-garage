import { orderService } from '../services/order.service';
import { orderConstants } from '../constants/order.constants';
import { message, notification } from 'antd';
import moment from 'moment';
import { OrderTypes } from '../constants/order-types.constants';

const saveOrder = (order, onSuccessCallback) => dispatch => {
	dispatch({ type: orderConstants.SAVE_ORDER_REQUEST });

	orderService.saveOrder({ ...order, serviceId: order.service._id }).then(
		result => {
			dispatch({ type: orderConstants.SAVE_ORDER_SUCCESS });
			notification.success({
				message: `${order.service.title} service was ordered.`,
				description: `Start time: ${moment(order.startDate).format('dddd, MMMM Do, h:mm a')}. Order number: ${result.order._id}`,
				duration: 5
			});
			onSuccessCallback();
		},
		error => {
			dispatch({ type: orderConstants.SAVE_ORDER_FAILURE });
			notification.error({ message: error, duration: 5, placement: 'bottomLeft' });
		}
	);
};

const getOrders = (page, type, isInitLoading) => dispatch => {
	switch (type) {
		case OrderTypes.IN_PROGRESS:
			getOrdersInProgress(page, isInitLoading)(dispatch);
			break;
		case OrderTypes.PLANNED:
			getPlannedOrders(page, isInitLoading)(dispatch);
			break;
		case OrderTypes.ARCHIVED:
			getArchivedOrders(page, isInitLoading)(dispatch);
			break;
		default:
			break;
	}
};

const getOrdersInProgress = (page, isInitLoading) => dispatch => {
	dispatch({ type: orderConstants.GET_IN_PROGRESS_ORDERS_REQUEST });

	orderService.getUserOrders(page, OrderTypes.IN_PROGRESS).then(
		result => {
			dispatch({
				type: orderConstants.GET_IN_PROGRESS_ORDERS_SUCCESS,
				payload: {
					orders: result.orders,
					pageCount: result.pageCount,
					isInitLoading,
					page
				}
			});
		},
		error => {
			dispatch({ type: orderConstants.GET_IN_PROGRESS_ORDERS_FAILURE });
			message.error(error);
		}
	);
};

const getPlannedOrders = (page, isInitLoading) => dispatch => {
	dispatch({ type: orderConstants.GET_PLANNED_ORDERS_REQUEST });

	orderService.getUserOrders(page, OrderTypes.PLANNED).then(
		result => {
			dispatch({
				type: orderConstants.GET_PLANNED_ORDERS_SUCCESS,
				payload: {
					orders: result.orders,
					pageCount: result.pageCount,
					isInitLoading,
					page
				}
			});
		},
		error => {
			dispatch({ type: orderConstants.GET_PLANNED_ORDERS_FAILURE });
			message.error(error);
		}
	);
};

const getArchivedOrders = (page, isInitLoading) => dispatch => {
	dispatch({ type: orderConstants.GET_ARCHIVED_ORDERS_REQUEST });

	orderService.getUserOrders(page, OrderTypes.ARCHIVED).then(
		result => {
			dispatch({
				type: orderConstants.GET_ARCHIVED_ORDERS_SUCCESS,
				payload: {
					orders: result.orders,
					pageCount: result.pageCount,
					isInitLoading,
					page
				}
			});
		},
		error => {
			dispatch({ type: orderConstants.GET_ARCHIVED_ORDERS_FAILURE });
			message.error(error);
		}
	);
};

const deleteUserOrder = (orderId, callback) => dispatch => {
	dispatch({ type: orderConstants.DELETE_ORDER_REQUEST });

	orderService.deleteUserOrders(orderId).then(
		res => {
			dispatch({ type: orderConstants.DELETE_ORDER_SUCCESS, payload: { orderId } });
			message.success(res.message);
			callback();
		},
		error => {
			dispatch({ type: orderConstants.DELETE_ORDER_FAILURE });
			message.error(error);
			callback();
		}
	);
};

export const orderActions = {
	saveOrder,
	getOrders,
	deleteUserOrder
};
