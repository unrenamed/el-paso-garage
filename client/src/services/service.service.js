const getServiceInfo = titleId => {
	return fetch(`/api/services/${titleId}/info`)
		.then(handleResponse);
};

const getServicesByType = type => {
	return fetch(`/api/services/${type}`)
		.then(handleResponse);
};

const handleResponse = (response) => {
	return response.text().then(text => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			const error = (data && (data.message || data.error)) || response.statusText;
			return Promise.reject(error);
		}
		return data;
	});
};

export const serviceService = {
	getServiceInfo,
	getServicesByType
};
