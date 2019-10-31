import React, { Component } from 'react';
import './Header.css';
import EpgLogo from '../../../assets/images/favicon.ico';
import { Link, withRouter } from 'react-router-dom';
import { Button, Icon, Menu } from 'antd';
import R from '../../res/R';
import { authActions } from '../../actions/auth.actions';
import { connect } from 'react-redux';
import { getHeaderMenuItems } from '../../constants/header-menu.constants';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentItemKey: this.getSelectedMenuItemKey()
		};
	}

	getSelectedMenuItemKey = () => {
		const urlPath = this.props.location.pathname.split('/').slice(0, 2).join('/');
		const selectedItem = getHeaderMenuItems().find(item => item.linkTo === urlPath);
		return selectedItem ? selectedItem.key : null;
	};

	handleClick = e => {
		this.setState({
			currentItemKey: e.key,
		});
	};

	getLoggedUserTemplate = () => {
		const { currentUser, logout } = this.props;
		const menuItems = getHeaderMenuItems();

		return (
			currentUser ?
				<div className="userBlock">
					<Menu onClick={this.handleClick} selectedKeys={[this.state.currentItemKey]} mode="horizontal">
						{
							menuItems.map(item =>
								<Menu.Item key={item.key}>
									<Link to={item.linkTo}>
										<Icon type={item.iconType} style={{ fontSize: '16px' }}/>
										{item.itemText}
									</Link>
								</Menu.Item>
							)
						}
					</Menu>
					<div className="userProfile">
						<span className="userName">{`${currentUser.firstName} ${currentUser.lastName}`}</span>
						<Button className="logoutBtn" onClick={() => logout()}>Logout</Button>
					</div>
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
											<Icon type="user" style={{ fontSize: '16px' }}/>
											Sign In
										</Link>
									</div>
									<div className="signUpAction">
										<Link to={'/registration'}>
											<Icon type="user-add" style={{ fontSize: '16px' }}/>
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

export default connect(null, mapDispatchToProps)(withRouter(Header));
