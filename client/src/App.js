import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import R from './res/R';
import { setupAppConfigs } from './configs/app.config';
import { withTitle } from './utils/title/withTitle.jsx';
import { connect } from 'react-redux';
import { authActions } from './actions/auth.actions';
import PrivateRoute from './utils/routes/PrivateRoute.jsx';
import Header from './components/header/Header.jsx';
import Login from './components/login/Login.jsx';
import Registration from './components/registration/Registration.jsx';
import Home from './components/home/Home.jsx';
import Spinner from './components/spinner/Spinner.jsx';
import UserOrders from './components/user/orders/UserOrders.jsx';
import About from './components/about/About.jsx';
import AutoServices from './components/auto-services/AutoServices.jsx';
import NotFound from './components/not-found/NotFound.jsx';

const LoginComponent = withTitle(`Sign in to ${R.strings.projectName}`)(Login);
const RegistrationComponent = withTitle(`Join ${R.strings.projectName}`)(Registration);
const HomeComponent = withTitle(`Home · ${R.strings.projectName}`)(Home);
const AboutComponent = withTitle(`About us · ${R.strings.projectName}`)(About);
const UserOrdersComponent = withTitle(`My orders · ${R.strings.projectName}`)(UserOrders);
const NotFoundComponent = withTitle(`Page not found · ${R.strings.projectName} `)(NotFound);
const AutoServicesComponent = withTitle(`Auto services · ${R.strings.projectName} `)(AutoServices);

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
				<Route exact path="/login" component={LoginComponent}/>
				<React.Fragment>
					<Header currentUser={currentUser}/>
					<Switch>
						<Route exact path="/" render={(props) => <HomeComponent {...props} currentUser={currentUser}/>}/>
						<Route exact path="/about-us" component={AboutComponent}/>
						<Route exact path="/registration" component={RegistrationComponent}/>
						<Route exact path="/services/:type" component={AutoServicesComponent}/>
						<PrivateRoute exact path="/my-orders" loadingUser={loadingUser} currentUser={currentUser} component={UserOrdersComponent}/>
						<Route path='/404' component={NotFoundComponent} />
						<Redirect from='*' to='/404' />
					</Switch>
				</React.Fragment>
			</Switch>
		);
	};

	render() {
		const { loadingUser, signingOut } = this.props;

		return (
			<Router>
				<div className="App">
					{
						loadingUser || signingOut ? <Spinner/> : this.getRoutesTemplate()
					}
				</div>
			</Router>
		);
	}
}

const mapStateToProps = state => {
	const { currentUser, loadingUser, signingOut } = state.authentication;

	return {
		currentUser,
		loadingUser,
		signingOut
	};
};

const mapDispatchToProps = {
	getLoggedUser: authActions.getLoggedUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withTitle()(App));
