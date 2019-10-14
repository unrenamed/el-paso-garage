const login = ({ email, password }) => {
	const requestOptions = {
		method: 'POST',
		body: JSON.stringify({ email, password }),
		headers: { 'Content-Type': 'application/json' }
	};

	return fetch('/api/authenticate', requestOptions)
		.then(handleResponse);
};

const register = ({ email, password, firstName, lastName, phoneNumber }) => {
	const user = { email, password, firstName, lastName, phoneNumber };
	const requestOptions = {
		method: 'POST',
		body: JSON.stringify(user),
		headers: { 'Content-Type': 'application/json' }
	};

	return fetch('/api/register', requestOptions)
		.then(handleResponse);
};

const checkToken = () => {
	return fetch('/api/checkToken')
		.then(handleResponse);
};

const handleResponse = (response) => {
	return response.text().then(text => {
		if (!response.ok) {
			const data = text && JSON.parse(text);
			const error = (data && (data.message || data.error)) || response.statusText;
			return Promise.reject(error);
		}
		return response.ok;
	});
};

export const authService = {
	login,
	register,
	checkToken
};
