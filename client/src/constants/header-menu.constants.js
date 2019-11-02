export const HeaderMenuEnum = {
	HOME: 'HOME',
	ABOUT_US: 'ABOUT_US',
	SERVICES: 'SERVICES',
	MY_ORDERS: 'MY_ORDERS',
	SERVICES_OIL_CHANGE: 'SERVICES_OIL_CHANGE',
	SERVICES_BRAKES: 'SERVICES_BRAKES',
	SERVICES_STANDARD_MAINTENANCE: 'SERVICES_STANDARD_MAINTENANCE'
};

export const HomeMenuItem = {
	key: HeaderMenuEnum.HOME,
	linkTo: '/',
	iconType: 'home',
	itemText: 'Home',
	withAuth: false
};

export const AboutUsMenuItem = {
	key: HeaderMenuEnum.ABOUT_US,
	linkTo: '/about-us',
	iconType: 'info-circle',
	itemText: 'About us',
	withAuth: false
};

export const ServicesMenuItem = {
	key: HeaderMenuEnum.SERVICES,
	linkTo: '/services',
	iconType: 'appstore',
	itemText: 'Services',
	withAuth: false,
	subItems: [
		{ key: HeaderMenuEnum.SERVICES_OIL_CHANGE, itemText: 'Oil change', linkTo: '/services/oil-change' },
		{ key: HeaderMenuEnum.SERVICES_BRAKES, itemText: 'Brakes', linkTo: '/services/brakes' },
		{
			key: HeaderMenuEnum.SERVICES_STANDARD_MAINTENANCE,
			itemText: 'Standard maintenance',
			linkTo: '/services/standard-maintenance'
		},
	]
};

export const MyOrdersMenuItem = {
	key: HeaderMenuEnum.MY_ORDERS,
	linkTo: '/my-orders',
	iconType: 'inbox',
	itemText: 'My orders',
	withAuth: true
};

export const getHeaderMenuItems = () => [
	HomeMenuItem,
	AboutUsMenuItem,
	ServicesMenuItem,
	MyOrdersMenuItem
];
