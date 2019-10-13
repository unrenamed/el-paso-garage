import { authConstants } from '../constants/auth.constants';
import { authService } from '../services/auth.service';
import { message } from 'antd';

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

const checkToken = () => dispatch => {
	dispatch({ type: authConstants.CHECK_TOKEN_REQUEST });

	authService.checkToken().then(
		() => {
			dispatch({ type: authConstants.CHECK_TOKEN_SUCCESS });
		},
		() => {
			dispatch({ type: authConstants.CHECK_TOKEN_FAILURE });
		}
	);
};

export const authActions = {
	login,
	checkToken
};
