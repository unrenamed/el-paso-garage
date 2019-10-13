import React, { Component } from 'react';
import { Icon, Spin } from 'antd';
import './Spinner.css';

class Spinner extends Component {

	getSpinnerIcon = () => <Icon type="loading" style={{ fontSize: 50 }} spin/>;

	render() {
		return (
			<div className="spinner">
				<Spin indicator={this.getSpinnerIcon()}/>
			</div>
		);
	}
}

export default Spinner;
