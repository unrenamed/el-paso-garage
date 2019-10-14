import { combineReducers } from 'redux';
import { users } from './users.reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';

export default combineReducers({
	users,
	authentication,
	registration
});
