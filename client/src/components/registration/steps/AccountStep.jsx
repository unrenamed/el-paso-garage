import React, { Component } from 'react';
import { Button, Form } from 'antd';
import Input from 'antd/lib/input';

class AccountStep extends Component {
	state = {
		confirmDirty: false
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.props.onSuccessSubmit(values);
			}
		});
	};

	handleConfirmBlur = e => {
		const { value } = e.target;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};

	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Item label="E-mail">
					{getFieldDecorator('email', {
						rules: [
							{
								type: 'email',
								message: 'The input is not valid E-mail!',
							},
							{
								required: true,
								message: 'Please input your E-mail!',
							},
						],
					})(<Input/>)}
				</Form.Item>
				<Form.Item label="Password" hasFeedback>
					{getFieldDecorator('password', {
						rules: [
							{
								required: true,
								message: 'Please input your password!',
							},
							{
								validator: this.validateToNextPassword,
							},
						],
					})(<Input.Password/>)}
				</Form.Item>
				<Form.Item label="Confirm Password" hasFeedback>
					{getFieldDecorator('confirm', {
						rules: [
							{
								required: true,
								message: 'Please confirm your password!',
							},
							{
								validator: this.compareToFirstPassword,
							},
						],
					})(<Input.Password onBlur={this.handleConfirmBlur}/>)}
				</Form.Item>
				<Form.Item>
					<div className="stepActions">
						<Button type="primary" htmlType="submit">Next</Button>
					</div>
				</Form.Item>
			</Form>
		);
	}
}

const AccountFormStep = Form.create({
	name: 'account-step',
	onFieldsChange(props, changedFields) {
		props = { ...props, ...changedFields };
	},
	mapPropsToFields(props) {
		return {
			email: Form.createFormField({
				value: props.user.email,
			}),
			password: Form.createFormField({
				value: props.user.password,
			}),
			confirm: Form.createFormField({
				value: props.user.password,
			})
		};
	}
})(AccountStep);

export default AccountFormStep;
