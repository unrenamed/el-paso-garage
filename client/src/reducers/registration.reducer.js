import { authConstants } from '../constants/auth.constants';

const initialState = {
	signingUp: false
};

export const registration = (state = initialState, action) => {
	switch (action.type) {
		case authConstants.REGISTER_REQUEST:
			return { signingUp: true };
		case authConstants.REGISTER_SUCCESS:
			return { signingUp: false };
		case authConstants.REGISTER_FAILURE:
			return { signingUp: false };
		default:
			return state;
	}
};



