import React, { Component } from 'react';
import { authActions } from '../../actions/auth.actions';
import { connect } from 'react-redux';
import Spinner from '../../components/spinner/Spinner.jsx';

const mapStateToProps = state => {
	const { checkingToken } = state.authentication;
	return { checkingToken };
};

const mapDispatchToProps = {
	checkToken: authActions.checkToken
};

const withAuth = ComponentToProtect => connect(mapStateToProps, mapDispatchToProps)(
	class extends Component {
		componentDidMount() {
			this.props.checkToken();
		}

		render() {
			const { checkingToken } = this.props;

			if (checkingToken) {
				return <Spinner />;
			}

			return <ComponentToProtect {...this.props} />;
		}
	});

export { withAuth };
