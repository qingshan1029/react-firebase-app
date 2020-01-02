import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import Login from './Login';
import Home from './Home'
import BoardList from "./BoardList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: null,
    };

    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo) {
        this.setState({ userInfo });
        localStorage.setItem('userId', userInfo.uid);
      } else {
        this.setState({ userInfo: null });
        localStorage.removeItem('userId');
      }
    });
  }

  render() {
    const userInfo = this.state.userInfo
    if(userInfo) {
      console.log('asd'+ userInfo.email)
    }
    return (
          <div className="App">
          {this.state.userInfo ? (
              <React.Fragment>
                  <Home
                      userInfo={userInfo}
                  />
                  <BoardList
                      userInfo={userInfo}
                  />
              </React.Fragment>
              ) :
              (
                    <Login/>
              )
          }
          </div>
    );
  }
}

export default App;
