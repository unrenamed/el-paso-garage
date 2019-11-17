import { message } from 'antd';
import { serviceService } from '../services/service.service';
import { serviceConstants } from '../constants/service.constants';

const getServiceInfo = titleId => dispatch => {
	dispatch({ type: serviceConstants.GET_SERVICE_INFO_REQUEST });

	serviceService.getServiceInfo(titleId).then(
		service => {
			dispatch({
				type: serviceConstants.GET_SERVICE_INFO_SUCCESS,
				payload: service
			});
		},
		error => {
			dispatch({ type: serviceConstants.GET_SERVICE_INFO_FAILURE });
			message.error(error);
		}
	);
};

const getServicesByType = type => dispatch => {
	dispatch({ type: serviceConstants.GET_SERVICES_BY_TYPE_REQUEST });

	serviceService.getServicesByType(type).then(
		services => {
			dispatch({
				type: serviceConstants.GET_SERVICES_BY_TYPE_SUCCESS,
				payload: services
			});
		},
		error => {
			dispatch({ type: serviceConstants.GET_SERVICES_BY_TYPE_FAILURE });
			message.error(error);
		}
	);
};

export const serviceActions = {
	getServicesByType,
	getServiceInfo
};
