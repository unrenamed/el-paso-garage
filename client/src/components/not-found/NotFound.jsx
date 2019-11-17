import React, { Component } from 'react';
import { Button, Result } from 'antd';
import './NotFound.css';
import { Link } from 'react-router-dom';

class NotFound extends Component {
	render() {
		return (
			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist."
				extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
			/>
		);
	}
}

export default NotFound;
