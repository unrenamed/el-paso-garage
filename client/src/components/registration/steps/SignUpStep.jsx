import React, { Component } from 'react';
import R from '../../../res/R';
import { Button } from 'antd';

class SignUpStep extends Component {
	render() {
		const { user, signingUp } = this.props;
		return (
			<div className="signUpStepWrapper">
				<h2>Hello, {`${user.firstName} ${user.lastName}`}.</h2>
				<p>
					We are glad to see you here in {R.strings.projectName}.
					It's great you want to start using our application.
					Feel free to finish your registration or come back to the previous steps to change your account
					information.
				</p>
				{
					signingUp ? (
						<div className="stepActions">
							<Button className="signUpButton" loading={true}>Signing up
								for {R.strings.projectName}</Button>
						</div>
					) : (
						<div className="stepActions">
							<Button className="signUpButton" onClick={this.props.onSignUpClicked}>Sign up
								for {R.strings.projectName}</Button>
							<Button style={{ marginLeft: 8 }} onClick={this.props.onPrevClicked}>Previous</Button>
						</div>
					)
				}
			</div>
		);
	}
}

export default SignUpStep;
