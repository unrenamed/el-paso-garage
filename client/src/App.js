import React from 'react';
import { connect } from "react-redux";
import { getUsersAction } from "./actions/getUsersAction";
import { Button, notification } from "antd";
import './App.css';
import * as _ from 'lodash';

class App extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    createUsersList = () => {
        const list = [];
        const {users} = this.props;

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
        })
    };

    render() {
        return (
            <div className="App">
                <Button onClick={() => this.openNotification()}>Click here</Button>
                <ol>
                    {this.createUsersList()}
                </ol>
            </div>
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
