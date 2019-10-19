import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { user } from './user.reducer';

export default combineReducers({
	authentication,
	registration,
	user
});
