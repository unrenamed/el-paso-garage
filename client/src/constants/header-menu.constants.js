export const HeaderMenuEnum = {
	HOME: 'HOME',
	MY_ORDERS: 'MY_ORDERS'
};

export const HomeMenuItem = {
	key: HeaderMenuEnum.HOME,
	linkTo: '/home',
	iconType: 'home',
	itemText: 'Home'
};

export const MyOrdersMenuItem = {
	key: HeaderMenuEnum.MY_ORDERS,
	linkTo: '/my-orders',
	iconType: 'inbox',
	itemText: 'My orders'
};

export const getHeaderMenuItems = () => [ HomeMenuItem, MyOrdersMenuItem];
