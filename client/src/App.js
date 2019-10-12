import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import R from './res/R';
import { setupAppConfigs } from './configs/app.config';
import { withAuth } from './utils/auth/withAuth.jsx';
import { withTitle } from './utils/title/withTitle.jsx';
import { compose } from 'redux';
import Header from './components/header/Header.jsx';
import Login from './components/login/Login.jsx';
import Registration from './components/registration/Registration.jsx';
import Home from './components/home/Home.jsx';

const LoginComponent = withTitle(`Sign in to ${R.strings.projectName}`)(Login);
const RegistrationComponent = withTitle(`Join ${R.strings.projectName}`)(Registration);
const HomeComponent = compose(
	withTitle(`Home · ${R.strings.projectName}`),
	withAuth
)(Home);

class App extends Component {
	componentDidMount() {
		setupAppConfigs();
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Header/>
					<Switch>
						<Route path="/login" component={LoginComponent}/>
						<Route path="/registration" component={RegistrationComponent}/>
						<Route path="/home" component={HomeComponent}/>
					</Switch>
				</div>
			</Router>
		);
	}
}

// const mapStateToProps = state => ({
// 	users: state.users
// });
//
// const mapDispatchToProps = dispatch => ({
// 	getUsers: () => dispatch(getUsersAction())
// });

export default withTitle()(App);
