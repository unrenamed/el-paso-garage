import { orderService } from '../services/order.service';
import { orderConstants } from '../constants/order.constants';
import { notification } from 'antd';
import moment from 'moment';

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

export const orderActions = {
	saveOrder
};
