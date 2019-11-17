import { serviceConstants } from '../constants/service.constants';

const initialState = {
	serviceInfo: {},
	services: [],
	loadingServices: false,
	loadingServiceInfo: false
};

export const serviceReducer = (state = initialState, action) => {
	switch (action.type) {
		case serviceConstants.GET_SERVICES_BY_TYPE_REQUEST:
			return {
				...state,
				loadingServices: true
			};
		case serviceConstants.GET_SERVICES_BY_TYPE_SUCCESS:
			return {
				...state,
				loadingServices: false,
				services: action.payload
			};
		case serviceConstants.GET_SERVICES_BY_TYPE_FAILURE:
			return {
				...state,
				loadingServices: false
			};
		case serviceConstants.GET_SERVICE_INFO_REQUEST:
			return {
				...state,
				loadingServiceInfo: true
			};
		case serviceConstants.GET_SERVICE_INFO_SUCCESS:
			return {
				...state,
				loadingServiceInfo: false,
				serviceInfo: action.payload
			};
		case serviceConstants.GET_SERVICE_INFO_FAILURE:
			return {
				...state,
				loadingServiceInfo: false
			};
		default:
			return state;
	}

};
