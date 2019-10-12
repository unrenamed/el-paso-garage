import React, { Component } from 'react';
import EpgLogo from '../../../assets/images/favicon.ico';
import { Link } from 'react-router-dom';
import './Login.css';
import R from '../../res/R';
import WrappedLoginForm from './LoginForm.jsx';
import { message } from 'antd';

class Login extends Component {

	getLoginOptions = (data) => {
		return {
			url: '/api/authenticate',
			options: {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		};
	};

	loginUser = async ({ email, password }) => {
		const { url, options } = this.getLoginOptions({ email, password });

		fetch(url, options)
			.then(res => {
				if (res.status === 200) {
					this.props.history.push('/');
					return res.ok;
				}
				return res.json();
			})
			.then(res => {
				if (res.error) {
					message.error(res.error);
				}
			})
			.catch(err => console.log(err));
	};

	render() {
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
							<WrappedLoginForm onSubmit={this.loginUser}/>
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

export default Login;
