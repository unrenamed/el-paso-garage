import React, { Component } from 'react';
import './Header.css';
import EpgLogo from '../../../assets/images/favicon.ico';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'antd';
import R from '../../res/R';
import { authActions } from '../../actions/auth.actions';
import { connect } from 'react-redux';

class Header extends Component {

	getLoggedUserTemplate = () => {
		const { currentUser, logout } = this.props;
		return (
			currentUser ?
				<div className="userBlock">
					<span className="userProfile">{`${currentUser.firstName} ${currentUser.lastName}`}</span>
					<Button className="logoutBtn" onClick={() => logout()}>Logout</Button>
				</div>
				: null
		);
	};

	render() {
		const { currentUser } = this.props;

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
							currentUser ? (
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

const mapDispatchToProps = {
	logout: authActions.logout
};

export default connect(null, mapDispatchToProps)(Header);
