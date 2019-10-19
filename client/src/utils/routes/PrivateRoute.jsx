import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, currentUser, loadingUser, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				currentUser
					? <Component currentUser={currentUser} {...props} />
					: <Redirect
						to={{
							pathname: '/login',
							state: { from: props.location }
						}}
					/>}
		/>
	);
};

export default PrivateRoute;
