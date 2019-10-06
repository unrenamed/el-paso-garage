import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsersAction } from './actions/getUsersAction';
import { Button, notification } from 'antd';
import './App.css';
import * as _ from 'lodash';
import Login from './components/login/Login.jsx';
import Registration from './components/registration/Registration.jsx';
import Header from './components/header/Header.jsx';

class App extends Component {
	componentDidMount() {
		this.props.getUsers();
	}

	createUsersList = () => {
		const list = [];
		const { users } = this.props;

		if (_.isEmpty(users)) {
			return list;
		}

		users.forEach(user => list.push(
			<li key={user._id}>{user.name + ' ' + user.age}</li>)
		);

		return list;
	};

	openNotification = () => {
		notification.success({
			message: 'Hi, I\' Nazar - El Paso Garage administrator ;)',
			description: 'So, welcome and feel free to use my app. See you soon!'
		});
	};

	render() {
		return (
			<Router>
				<div className="App">
					<Header/>
					<Link to={'/login'}>Log In</Link>
					<Link to={'/registration'}>Sign In</Link>
					<Button onClick={() => this.openNotification()}>Click here</Button>
					<ol>
						{this.createUsersList()}
					</ol>
					<Switch>
						<Route path="/login" component={Login} />
						<Route path="/registration" component={Registration} />
					</Switch>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = state => ({
	users: state.users
});

const mapDispatchToProps = dispatch => ({
	getUsers: () => dispatch(getUsersAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
