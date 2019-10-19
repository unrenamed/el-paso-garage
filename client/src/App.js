import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import R from './res/R';
import { setupAppConfigs } from './configs/app.config';
import { withTitle } from './utils/title/withTitle.jsx';
import { connect } from 'react-redux';
import Header from './components/header/Header.jsx';
import Login from './components/login/Login.jsx';
import Registration from './components/registration/Registration.jsx';
import Home from './components/home/Home.jsx';
import Spinner from './components/spinner/Spinner.jsx';
import PrivateRoute from './utils/routes/PrivateRoute.jsx';
import { authActions } from './actions/auth.actions';

const LoginComponent = withTitle(`Sign in to ${R.strings.projectName}`)(Login);
const RegistrationComponent = withTitle(`Join ${R.strings.projectName}`)(Registration);
const HomeComponent = withTitle(`Home · ${R.strings.projectName}`)(Home);

class App extends Component {
	componentDidMount() {
		setupAppConfigs();
		this.getCurrentUser();
	}

	getCurrentUser = () => {
		this.props.getLoggedUser();
	};

	getRoutesTemplate = () => {
		const { currentUser, loadingUser } = this.props;

		return (
			<Switch>
				<Route path="/login" component={LoginComponent}/>
				<React.Fragment>
					<Header currentUser={currentUser}/>
					<Route path="/registration" component={RegistrationComponent}/>
					<PrivateRoute path="/home" loadingUser={loadingUser} currentUser={currentUser} component={HomeComponent}/>
				</React.Fragment>
			</Switch>
		);
	};

	render() {
		const { loadingUser } = this.props;

		return (
			<Router>
				<div className="App">
					{
						loadingUser ? <Spinner/> : this.getRoutesTemplate()
					}
				</div>
			</Router>
		);
	}
}

const mapStateToProps = state => {
	const { currentUser, loadingUser } = state.authentication;

	return {
		currentUser,
		loadingUser
	};
};

const mapDispatchToProps = {
	getLoggedUser: authActions.getLoggedUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withTitle()(App));
