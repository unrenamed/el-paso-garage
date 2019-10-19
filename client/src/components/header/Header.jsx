import React, { Component } from 'react';
import './Header.css';
import EpgLogo from '../../../assets/images/favicon.ico';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import R from '../../res/R';

class Header extends Component {

	getLoggedUserTemplate = () => {
		const { currentUser } = this.props;
		return (
			currentUser ? <div>{`${currentUser.firstName} ${currentUser.lastName}`}</div> : null
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

export default Header;
