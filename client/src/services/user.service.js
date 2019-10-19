import { utils } from '../utils/utils';

const getLoggedUser = () => {
	return fetch('/api/users/logged')
		.then(handleResponse);
};

const checkUserNotExists = email => {
	const params = utils.convertObjToUrlParams({ email });
	return fetch(`/api/users/checkEmail?${params}`)
		.then(handleResponse);
};

const handleResponse = response => response.text()
	.then(text => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			const error = (data && (data.message || data.error)) || response.statusText;
			return Promise.reject(error);
		}
		return data;
	});


export const userService = {
	getLoggedUser,
	checkUserNotExists
};
