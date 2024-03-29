import React, { Component } from 'react';
import './Header.css';
import EpgLogo from '../../../assets/images/favicon.ico';
import { Link, withRouter } from 'react-router-dom';
import { Avatar, Dropdown, Icon, Menu, Tag } from 'antd';
import R from '../../res/R';
import { authActions } from '../../actions/auth.actions';
import { connect } from 'react-redux';
import { getHeaderMenuItems, HeaderMenuEnum } from '../../constants/header-menu.constants';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentItemKey: this.getSelectedMenuItemKey()
		};
	}

	getSelectedMenuItemKey = () => {
		const urlPath = this.props.location.pathname;
		const defaultItem = HeaderMenuEnum.HOME;

		const selectedMenuItemUrlPath = urlPath.split('/').slice(0, 2).join('/');
		let selectedItem = getHeaderMenuItems().find(item => item.linkTo === selectedMenuItemUrlPath);

		if (!selectedItem) {
			return defaultItem;
		}

		if (selectedItem.subItems && selectedItem.subItems.length > 0) {
			const selectedMenuSubItemUrlPath = `/${urlPath.split('/').slice(2, 3)}`;
			selectedItem = selectedItem.subItems.find(subItem => subItem.linkTo === selectedMenuSubItemUrlPath);
		}

		if (!selectedItem || (selectedItem.withAuth && !this.props.currentUser)) {
			return defaultItem;
		}

		return selectedItem.key;
	};

	handleClick = e => {
		this.setState({
			currentItemKey: e.key,
		});
	};

	isMenuItemNotVisible = item => {
		const { currentUser } = this.props;
		return item.withAuth === true && !currentUser;
	};

	doesItemContainSubItems = item => item.subItems && item.subItems.length > 0;

	getMenuTemplate = () => {
		const menuItems = getHeaderMenuItems();

		return (
			<Menu onClick={this.handleClick} selectedKeys={[this.state.currentItemKey]} mode="horizontal">
				{
					menuItems.map(item => {
							if (this.isMenuItemNotVisible(item)) {
								return null;
							}

							if (this.doesItemContainSubItems(item)) {
								return (
									<Menu.SubMenu
										key={item.key}
										title={
											<span>
												<Icon type={item.iconType} style={{ fontSize: '18px' }}/>
												{item.itemText}
											</span>
										}
									>
										{
											item.subItems.map(subItem => {
												if (this.isMenuItemNotVisible(subItem)) {
													return null;
												}

												return (
													<Menu.Item key={subItem.key}>
														<Link to={`${item.linkTo}${subItem.linkTo}`}
															  style={{ display: 'flex', justifyContent: 'space-between' }}>
															<span style={{ marginRight: '1em' }}>{subItem.itemText}</span>
															{subItem.withAuth ? <Tag color="gold">Premium</Tag> : null}
														</Link>
													</Menu.Item>
												);
											})
										}
									</Menu.SubMenu>
								);
							}


							return (
								<Menu.Item key={item.key}>
									<Link to={item.linkTo}>
										<Icon type={item.iconType} style={{ fontSize: '18px' }}/>
										{item.itemText}
									</Link>
								</Menu.Item>
							);
						}
					)
				}
			</Menu>

		);
	};

	getUserBlockTemplate = () => {
		const { currentUser, logout } = this.props;

		const menu = currentUser ? (
			<Menu>
				<Menu.Item style={{ cursor: 'auto', pointerEvents: 'none' }}>
					Signed in as <strong>{currentUser.email}</strong>
				</Menu.Item>
				<Menu.Divider/>
				<Menu.Item key="logout" onClick={logout} className="userBlockMenuItem">Logout</Menu.Item>
			</Menu>
		) : null;

		return (
			<div className="userBlock">
				{
					currentUser ? (
						<Dropdown overlay={menu}>
								<span
									style={{ height: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
									className="userName">
									{`${currentUser.firstName} ${currentUser.lastName}`}
									<Avatar icon="user" style={{ marginLeft: '0.5em' }}/>
								</span>
						</Dropdown>

					) : (
						<div className="authenticationActions">
							<div className="signInAction">
								<Link to={'/login'}>
									<Icon type="user" style={{ fontSize: '18px' }}/>
									Sign In
								</Link>
							</div>
							<div className="signUpAction">
								<Link to={'/registration'}>
									<Icon type="user-add" style={{ fontSize: '18px' }}/>
									Sign Up
								</Link>
							</div>
						</div>
					)
				}
			</div>
		);
	};

	render() {
		const headerMenu = this.getMenuTemplate();
		const userBlock = this.getUserBlockTemplate();

		return (
			<div className="header">
				<div>
					<div className="logo">
						<img src={EpgLogo}/>
						<span>{R.strings.projectName}</span>
					</div>
					<div className="content">
						{headerMenu}
						{userBlock}
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
