const convertObjToUrlParams = object => {
	return Object.keys(object)
		.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
		.join('&');
};

export const utils = {
	convertObjToUrlParams
};
