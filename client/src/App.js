import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import R from './res/R';
import { setupAppConfigs } from './configs/app.config';
import { withAuth } from './utils/auth/withAuth.jsx';
import { withTitle } from './utils/title/withTitle.jsx';
import Header from './components/header/Header.jsx';
import Login from './components/login/Login.jsx';
import Registration from './components/registration/Registration.jsx';
import Home from './components/home/Home.jsx';

const LoginComponent = withTitle(`Sign in to ${R.strings.projectName}`)(Login);
const RegistrationComponent = withTitle(`Join ${R.strings.projectName}`)(Registration);
const HomeComponent = withTitle(`Home · ${R.strings.projectName}`)(Home);
const HeaderComponent = withAuth(Header);

class App extends Component {
	componentDidMount() {
		setupAppConfigs();
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Switch>
						<Route path="/login" component={LoginComponent}/>
						<React.Fragment>
							<HeaderComponent/>
							<Route path="/registration" component={RegistrationComponent}/>
							<Route path="/home" component={HomeComponent}/>
						</React.Fragment>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default withTitle()(App);
