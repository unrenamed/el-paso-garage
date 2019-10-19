import { authConstants } from '../constants/auth.constants';
import { authService } from '../services/auth.service';
import { message } from 'antd';
import { userService } from '../services/user.service';
import { userActions } from './user.actions';

const login = ({ email, password }) => dispatch => {
	dispatch({ type: authConstants.LOGIN_REQUEST });

	authService.login({ email, password }).then(
		() => {
			dispatch({ type: authConstants.LOGIN_SUCCESS });
		},
		error => {
			dispatch({ type: authConstants.LOGIN_FAILURE });
			message.error(error);
		}
	);
};

const register = (user, successCallback) => dispatch => {
	dispatch({ type: authConstants.REGISTER_REQUEST });

	authService.register(user).then(
		() => {
			dispatch({ type: authConstants.REGISTER_SUCCESS });
			successCallback();
		},
		error => {
			dispatch({ type: authConstants.REGISTER_FAILURE });
			message.error(error);
		}
	);
};

const checkToken = () => dispatch => {
	dispatch({ type: authConstants.CHECK_TOKEN_REQUEST });

	authService.checkToken().then(
		() => {
			dispatch({ type: authConstants.CHECK_TOKEN_SUCCESS });
			userActions.getLoggedUser()(dispatch);
		},
		() => {
			dispatch({ type: authConstants.CHECK_TOKEN_FAILURE });
		}
	);
};

export const authActions = {
	login,
	register,
	checkToken
};
