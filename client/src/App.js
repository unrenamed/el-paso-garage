import React from 'react';
import './App.css';
import { connect } from "react-redux";
import { getUsersAction } from "./actions/getUsersAction";
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

    render() {
        return (
            <div className="App">
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
