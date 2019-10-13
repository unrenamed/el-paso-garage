import { authConstants } from '../constants/auth.constants';

const initialState = {
	isAuthenticated: false,
	signingIn: false,
	checkingToken: false
};

export const authentication = (state = initialState, action) => {
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			return {
				signingIn: true
			};
		case authConstants.LOGIN_SUCCESS:
			return {
				signingIn: false,
				isAuthenticated: true
			};
		case authConstants.LOGIN_FAILURE:
			return {
				signingIn: false,
				isAuthenticated: false
			};
		case authConstants.CHECK_TOKEN_REQUEST:
			return {
				checkingToken: true,
			};
		case authConstants.CHECK_TOKEN_SUCCESS:
			return {
				checkingToken: false,
				isAuthenticated: true
			};
		case authConstants.CHECK_TOKEN_FAILURE:
			return {
				checkingToken: false,
				isAuthenticated: false
			};
		default:
			return state;
	}
};
