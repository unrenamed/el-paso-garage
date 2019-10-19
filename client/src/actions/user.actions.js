import { userService } from '../services/user.service';

const checkUserNotExists = user => {
	const { email } = user;
	return userService.checkUserNotExists(email);
};

export const userActions = {
	checkUserNotExists
};
