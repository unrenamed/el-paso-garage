import { userConstants } from '../constants/user.constants';

export const user = (state = {}, action) => {
	switch (action.type) {
		case userConstants.GET_LOGGED_USER_REQUEST:
			return {};
		case userConstants.GET_LOGGED_USER_SUCCESS:
			return {
				user: action.payload
			};
		case userConstants.GET_LOGGED_USER_FAILURE:
			return {};
		default:
			return state;
	}
};
