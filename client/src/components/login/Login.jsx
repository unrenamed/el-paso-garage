import React, { Component } from 'react';
import EpgLogo from '../../../assets/images/favicon.ico';
import { Link, Redirect } from 'react-router-dom';
import './Login.css';
import R from '../../res/R';
import WrappedLoginForm from './LoginForm.jsx';
import { authActions } from '../../actions/auth.actions';
import { connect } from 'react-redux';

class Login extends Component {

	loginUser = ({ email, password }) => {
		this.props.loginUser({ email, password });
	};

	render() {
		const { signingIn, currentUser } = this.props;

		if (currentUser) {
			return <Redirect to="/"/>;
		}

		return (
			<div className="loginWrapper">
				<div className="loginHeader">
					<div className="projectLogo">
						<Link to={'/'}>
							<img src={EpgLogo}/>
						</Link>
					</div>
				</div>
				<div className="loginContent">
					<div className="loginForm">
						<div className="formHeader">
							<h3>Sign in to {R.strings.projectName}</h3>
						</div>
						<div className="formBody">
							<WrappedLoginForm onSubmit={this.loginUser} signingIn={signingIn}/>
						</div>
						<div className="formFooter">
							<p>New to {R.strings.projectName}?</p>
							<Link to="/registration">Create an account.</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { signingIn, currentUser } = state.authentication;
	return { signingIn, currentUser };
};

const mapDispatchToProps = {
	loginUser: authActions.login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
