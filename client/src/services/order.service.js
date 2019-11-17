const saveOrder = order => {
	const requestOptions = {
		method: 'POST',
		body: JSON.stringify(order),
		headers: { 'Content-Type': 'application/json' }
	};

	return fetch('/api/orders', requestOptions)
		.then(handleResponse);
};

const getUserOrders = (page, type) => {
	return fetch(`/api/orders?page=${page}&type=${type}`)
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

export const orderService = {
	saveOrder,
	getUserOrders
};
