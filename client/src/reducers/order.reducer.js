import { orderConstants } from '../constants/order.constants';
import { PageableConfig } from '../constants/pageable.constants';

const initialState = {
	savingOrder: false,

	inProgressOrdersList: [],
	inProgressOrdersListPage: 0,
	inProgressOrdersListPageCount: 1,

	plannedOrdersList: [],
	plannedOrdersListPage: 0,
	plannedOrdersListPageCount: 1,

	archivedOrdersList: [],
	archivedOrdersListPage: 0,
	archivedOrdersListPageCount: 1,

	loading: true,
	deleteLoading: false
};

export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case orderConstants.SAVE_ORDER_REQUEST:
			return { ...state, savingOrder: true };
		case orderConstants.SAVE_ORDER_SUCCESS:
			return { ...state, savingOrder: false };
		case orderConstants.SAVE_ORDER_FAILURE:
			return { ...state, savingOrder: false };


		case orderConstants.GET_IN_PROGRESS_ORDERS_REQUEST:
			return {
				...state,
				loading: true,
				inProgressOrdersList: getSkeletonList(state.inProgressOrdersList)
			};
		case orderConstants.GET_IN_PROGRESS_ORDERS_SUCCESS:
			return {
				...state,
				loading: false,
				inProgressOrdersList: addMoreOrdersToList(state.inProgressOrdersList, action.payload),
				inProgressOrdersListPage: action.payload.page,
				inProgressOrdersListPageCount: action.payload.pageCount
			};
		case orderConstants.GET_IN_PROGRESS_ORDERS_FAILURE:
			return {
				...state,
				loading: false,
				inProgressOrdersList: removeSkeletonItemsFromList(state.inProgressOrdersList)
			};


		case orderConstants.GET_PLANNED_ORDERS_REQUEST:
			return {
				...state,
				loading: true,
				plannedOrdersList: getSkeletonList(state.plannedOrdersList)
			};
		case orderConstants.GET_PLANNED_ORDERS_SUCCESS:
			return {
				...state,
				loading: false,
				plannedOrdersList: addMoreOrdersToList(state.plannedOrdersList, action.payload),
				plannedOrdersListPage: action.payload.page,
				plannedOrdersListPageCount: action.payload.pageCount
			};
		case orderConstants.GET_PLANNED_ORDERS_FAILURE:
			return {
				...state,
				loading: false,
				plannedOrdersList: removeSkeletonItemsFromList(state.plannedOrdersList)
			};


		case orderConstants.GET_ARCHIVED_ORDERS_REQUEST:
			return {
				...state,
				loading: true,
				archivedOrdersList: getSkeletonList(state.archivedOrdersList)
			};
		case orderConstants.GET_ARCHIVED_ORDERS_SUCCESS:
			return {
				...state,
				loading: false,
				archivedOrdersList: addMoreOrdersToList(state.archivedOrdersList, action.payload),
				archivedOrdersListPage: action.payload.page,
				archiveOrdersListPageCount: action.payload.pageCount
			};
		case orderConstants.GET_ARCHIVED_ORDERS_FAILURE:
			return {
				...state,
				loading: false,
				archivedOrdersList: removeSkeletonItemsFromList(state.archivedOrdersList)
			};


		case orderConstants.DELETE_ORDER_REQUEST:
			return { ...state, deleteLoading: true };
		case orderConstants.DELETE_ORDER_SUCCESS:
			return {
				...state,
				deleteLoading: false,
				plannedOrdersList: removeOrderAndReturnList(action.payload.orderId, state.plannedOrdersList)
			};
		case orderConstants.DELETE_ORDER_FAILURE:
			return { ...state, deleteLoading: false };

		default:
			return state;
	}
};

const getSkeletonList = list => {
	return list.concat([...new Array(PageableConfig.ITEMS_PER_PAGE)])
		.map(o => ({ key: list[o], ...o }));
};

const removeSkeletonItemsFromList = list => {
	return list.filter(o => !list.slice(-3).includes(o));
};

const addMoreOrdersToList = (list, payload) => {
	const { orders, isInitLoading } = payload;
	list = isInitLoading ? [] : removeSkeletonItemsFromList(list);
	return list.concat(orders);
};

const removeOrderAndReturnList = (orderId, list) => {
	return list.filter(i => i._id !== orderId);
};
