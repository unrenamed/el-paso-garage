import React, { Component } from 'react';
import { authActions } from '../../actions/auth.actions';
import { connect } from 'react-redux';
import Spinner from '../../components/spinner/Spinner.jsx';

const withAuth = ComponentToProtect => {
	class WithAuthComponent extends Component {
		componentDidMount() {
			this.props.checkToken();
		}

		render() {
			const { checkingToken } = this.props;

			if (checkingToken) {
				return <Spinner/>;
			}

			return (
				<React.Fragment>
					<ComponentToProtect {...this.props} />
				</React.Fragment>
			);
		}
	}

	const mapStateToProps = state => {
		const { checkingToken } = state.authentication;
		return { checkingToken };
	};

	const mapDispatchToProps = {
		checkToken: authActions.checkToken
	};

	return connect(mapStateToProps, mapDispatchToProps)(WithAuthComponent);
};

export { withAuth };
