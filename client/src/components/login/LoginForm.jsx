import { Button, Form, Icon, Input } from 'antd';
import React, { Component } from 'react';
import './LoginForm.css';

class LoginForm extends Component {

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.onSubmit(values);
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { signingIn } = this.props;
		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<Form.Item>
					{getFieldDecorator('email', {
						rules: [
							{ required: true, message: 'Please input your email address!' },
							{ type: 'email', message: 'The input is not valid E-mail!' },
						],
					})(
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
							placeholder="Email address"
						/>,
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your password!' }],
					})(
						<Input.Password
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
							type="password"
							placeholder="Password"
						/>,
					)}
				</Form.Item>
				<Form.Item className="signInButton">
					<Button type="primary" htmlType="submit" className="login-form-button" loading={signingIn}>
						Sign in
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

const WrappedLoginForm = Form.create({ name: 'login_form' })(LoginForm);

export default WrappedLoginForm;
