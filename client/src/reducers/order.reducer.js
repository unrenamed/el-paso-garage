import { orderConstants } from '../constants/order.constants';

const initialState = {
	savingOrder: false
};

export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case orderConstants.SAVE_ORDER_REQUEST:
			return { ...state, savingOrder: true };
		case orderConstants.SAVE_ORDER_SUCCESS:
			return { ...state, savingOrder: false };
		case orderConstants.SAVE_ORDER_FAILURE:
			return { ...state, savingOrder: false };
		default:
			return state;
	}
};
