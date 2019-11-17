import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { serviceReducer } from './service.reducer';
import { orderReducer } from './order.reducer';

export default combineReducers({
	authentication,
	registration,
	serviceReducer,
	orderReducer
});
