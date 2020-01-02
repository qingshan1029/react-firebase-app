import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        alert("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      alert("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      alert("Error removing document: ", error);
    });
  }

  render() {
    alert(this.props.key)
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4 style={{ textDecoration: 'inherit', color: 'red' }}><Link to="/">Detailed Info</Link></h4>
            <h3 class="panel-title" style={{ color: 'rgb(0, 128, 0)' }} >
              {this.state.board.fullName}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Address:</dt>
              <dd>{this.state.board.address}</dd>
              <dt>City:</dt>
              <dd>{this.state.board.city}</dd>
              <dt>Zip:</dt>
              <dd>{this.state.board.zip}</dd>
              <dt>Telephone:</dt>
              <dd>{this.state.board.telephone}</dd>
              <dt>Content:</dt>
              <dd>{this.state.board.content}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
