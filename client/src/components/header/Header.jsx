import React, { Component } from 'react';
import './Header.css';
import EpgLogo from '../../../assets/images/favicon.ico';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import R from '../../res/R';
import { connect } from 'react-redux';

class Header extends Component {

	getLoggedUserTemplate = () => {
		const { user } = this.props;
		return (
			user ? <div>{`${user.firstName} ${user.lastName}`}</div> : null
		);
	};

	render() {
		const { isAuthenticated } = this.props;
		const userBlock = this.getLoggedUserTemplate();
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
								userBlock
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
	}
}

const mapStateToProps = state => {
	const { isAuthenticated } = state.authentication;
	const { user } = state.user;
	return { isAuthenticated, user };
};

export default connect(mapStateToProps, null)(Header);
