import React, { Component } from 'react';

class Home extends Component {
	render() {
		const { currentUser } = this.props;

		return (
			<div>
				Home component is working :)
				{
					`User: ${currentUser.firstName} ${currentUser.lastName}, email: ${currentUser.email}`
				}
			</div>
		);
	}
}

export default Home;
