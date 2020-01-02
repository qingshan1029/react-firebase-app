import React, { Component } from 'react';
import fire from './Firebase';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        fire.auth().signOut();
    }

    render() {
        const { userInfo } = this.props
        return (
            <div>
                <h1>Welcome to {userInfo.email} </h1>
                <button onClick={this.logout}>Logout</button>
            </div>
        );

    }

}

export default Home;

