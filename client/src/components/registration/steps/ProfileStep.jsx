import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';

class ProfileStep extends Component {

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.props.onSuccessSubmit(values);
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Item label="First name">
					{getFieldDecorator('firstName', {
						rules: [{ required: true, message: 'Please input your first name.' }],
					})(<Input/>)}
				</Form.Item>
				<Form.Item label="Last name">
					{getFieldDecorator('lastName', {
						rules: [{ required: true, message: 'Please input your last name.' }],
					})(<Input/>)}
				</Form.Item>
				<Form.Item label="Phone number">
					{getFieldDecorator('phoneNumber', {
						rules: [{ required: true, message: 'Please input your phone number.' }],
					})(<Input/>)}
				</Form.Item>
				<Form.Item>
					<div className="stepActions">
						<Button type="primary" htmlType="submit">Next</Button>
						<Button style={{ marginLeft: 8 }} onClick={this.props.onPrevClicked}>Previous</Button>
					</div>
				</Form.Item>
			</Form>
		);
	}
}

const ProfileFormStep = Form.create({
	name: 'profile-step',
	onFieldsChange(props, changedFields) {
		props = { ...props, ...changedFields };
	},
	mapPropsToFields(props) {
		return {
			firstName: Form.createFormField({
				value: props.user.firstName,
			}),
			lastName: Form.createFormField({
				value: props.user.lastName,
			}),
			phoneNumber: Form.createFormField({
				value: props.user.phoneNumber,
			})
		};
	}
})(ProfileStep);

export default ProfileFormStep;
