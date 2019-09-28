import React from 'react';
import './App.css';

class App extends React.Component {
    state = {
        users: []
    };

    componentDidMount() {
        this.getUsers();
    }

    getUsers = () => {
        fetch('/users')
            .then(res => res.clone().json())
            .then(users => this.setState({ users }));
    };

    createUsersList = () => {
        const list = [];
        const { users } = this.state;

        users.forEach(user => list.push(<li key={user.id}>{ user.name + user.age }</li>));

        return list;
    };

    render() {
        return (
            <div className="App">
                <ol>
                    { this.createUsersList() }
                </ol>
            </div>
        );
    }
}

export default App;
