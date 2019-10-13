import React, { Component } from 'react';
import './Header.css';
import EpgLogo from '../../../assets/images/favicon.ico';
import { Link, withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import R from '../../res/R';
import { connect } from 'react-redux';

class Header extends Component {

	notVisible = () => {
		const { location } = this.props;
		return location.pathname.match('/login');
	};

	getHeaderTemplate = () => {
		const { isAuthenticated } = this.props;

		return (
			<div className="header">
				<div>
					<div className="logo">
						<Link to={'/'}>
							<img src={EpgLogo}/>
							<span>{R.strings.projectName}</span>
						</Link>
					</div>
					<div className="content">
						{
							isAuthenticated ? (
								<div>Logged user</div>
							) : (
								<div className="authenticationActions">
									<div className="signInAction">
										<Link to={'/login'}>
											<Icon type="user" style={{ fontSize: '22px' }}/>
											Sign In
										</Link>
									</div>
									<div className="signUpAction">
										<Link to={'/registration'}>
											<Icon type="user-add" style={{ fontSize: '22px' }}/>
											Sign Up
										</Link>
									</div>
								</div>
							)
						}
					</div>
				</div>
			</div>
		);
	};

	render() {
		return this.notVisible() ? null : this.getHeaderTemplate();
	}
}

const mapStateToProps = state => {
	const { isAuthenticated } = state.authentication;
	return {
		isAuthenticated
	};
};

export default connect(mapStateToProps)(withRouter(Header));
