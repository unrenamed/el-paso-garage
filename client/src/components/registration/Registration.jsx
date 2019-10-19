import React, { Component } from 'react';
import './Registration.css';
import R from '../../res/R';
import { Steps } from 'antd';
import AccountFormStep from './steps/AccountStep.jsx';
import ProfileFormStep from './steps/ProfileStep.jsx';
import SignUpStep from './steps/SignUpStep.jsx';
import { authActions } from '../../actions/auth.actions';
import { connect } from 'react-redux';

const { Step } = Steps;

class Registration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 0,
			user: {
				email: '',
				password: '',
				firstName: '',
				lastName: '',
				phoneNumber: ''
			}
		};
	}

	getRegistrationSteps = () => [
		{
			title: 'Account',
			description: 'Configure your account.',
			content: <AccountFormStep onSuccessSubmit={this.submitAccountStep} user={this.state.user}/>
		},
		{
			title: 'Profile',
			description: 'Setup profile settings.',
			content: <ProfileFormStep onSuccessSubmit={this.submitProfileStep}
									  user={this.state.user}
									  onPrevClicked={this.prev}/>
		},
		{
			title: 'Sign up',
			description: 'Check your preferences and sign up.',
			content: <SignUpStep user={this.state.user}
								 signingUp={this.props.signingUp}
								 onPrevClicked={this.prev}
								 onSignUpClicked={this.signUpUser}/>
		},
	];

	signUpUser = () => {
		const user = this.state.user;
		this.props.signUpUser(user, this.redirectToLoginPage);
	};

	redirectToLoginPage = () => {
		this.props.history.push('/login');
	};

	submitAccountStep = ({ email, password }) => {
		const user = { ...this.state.user, email, password };
		this.setState({ ...this.state, user }, this.next);
	};

	submitProfileStep = ({ firstName, lastName, phoneNumber }) => {
		const user = { ...this.state.user, firstName, lastName, phoneNumber };
		this.setState({ ...this.state, user }, this.next);
	};

	next = () => {
		const current = this.state.current + 1;
		this.setState({ ...this.state, current });
	};

	prev = () => {
		const current = this.state.current - 1;
		this.setState({ ...this.state, current });
	};

	render() {
		const { isAuthenticated } = this.props;

		if (isAuthenticated) {
			this.props.history.push('/');
		}

		const steps = this.getRegistrationSteps();
		const { current } = this.state;

		return (
			<div className="registrationWrapper">
				<div className="registrationHeader">
					<span>Join {R.strings.projectName}</span>
					<h1>Create your account</h1>
				</div>
				<div className="registrationBody">
					<Steps current={current} className="registrationSteps">
						{steps.map(item => (
							<Step key={item.title} title={item.title} description={item.description}/>
						))}
					</Steps>
					<div className="stepsContent">{steps[current].content}</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { isAuthenticated, signingUp } = { ...state.authentication, ...state.registration };
	return { isAuthenticated, signingUp };
};

const mapDispatchToProps = {
	signUpUser: authActions.register
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
