import { userConstants } from '../constants/user.constants';
import { userService } from '../services/user.service';

const getLoggedUser = () => dispatch => {
	dispatch({ type: userConstants.GET_LOGGED_USER_REQUEST });

	userService.getLoggedUser().then(
		user => {
			dispatch({ type: userConstants.GET_LOGGED_USER_SUCCESS, payload: user });
		},
		error => {
			dispatch({ type: userConstants.GET_LOGGED_USER_FAILURE });
		}
	);
};

const checkUserNotExists = user => {
	const { email } = user;
	return userService.checkUserNotExists(email);
};

export const userActions = {
	getLoggedUser,
	checkUserNotExists
};
