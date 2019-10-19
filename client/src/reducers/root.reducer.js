import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';

export default combineReducers({
	authentication,
	registration
});
