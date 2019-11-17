export const HeaderMenuEnum = {
	HOME: 'HOME',
	ABOUT_US: 'ABOUT_US',
	MY_ORDERS: 'MY_ORDERS',
	SERVICES: 'SERVICES',

	STANDARD_MAINTENANCE_SERVICE: 'STANDARD_MAINTENANCE_SERVICE',
	TIRE_SERVICE: 'TIRE_SERVICE',
	EXHAUST_SERVICE: 'EXHAUST_SERVICE',
	ENGINE_SERVICE: 'ENGINE_SERVICE',
	AUTO_ELECTRICAL_SERVICE: 'AUTO_ELECTRICAL_SERVICE'
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
		{
			key: HeaderMenuEnum.STANDARD_MAINTENANCE_SERVICE,
			itemText: 'Standard maintenance',
			linkTo: '/standard-maintenance',
			withAuth: false
		},
		{
			key: HeaderMenuEnum.TIRE_SERVICE,
			itemText: 'Tire service',
			linkTo: '/tire',
			withAuth: false
		},
		{
			key: HeaderMenuEnum.EXHAUST_SERVICE,
			itemText: 'Exhaust service',
			linkTo: '/exhaust',
			withAuth: false
		},
		{
			key: HeaderMenuEnum.ENGINE_SERVICE,
			itemText: 'Engine service',
			linkTo: '/engine',
			withAuth: true
		},
		{
			key: HeaderMenuEnum.AUTO_ELECTRICAL_SERVICE,
			itemText: 'Auto electrical service',
			linkTo: '/auto-electrical',
			withAuth: true
		}
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
