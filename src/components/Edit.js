import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      fullName: '',
      address: '',
      city: '',
      zip: '',
      telephone: '',
      content: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          fullName: board.fullName,
          address: board.address,
          city: board.city,
          zip: board.zip,
          telephone: board.telephone,
          content: board.content
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { fullName, address, city, zip, telephone, content } = this.state;
    console.log(telephone + "    "+ content)
    const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
    updateRef.set({
      fullName,
      address,
      city,
      zip,
      telephone,
      content
    }).then((docRef) => {
      this.setState({
        key: '',
        fullName: '',
        address: '',
        city: '',
        zip: '',
        telephone: '',
        content: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title" style={{color:'rgb(0,0,128'}}>
              Edit Personal Information
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Board List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="fullName">FullName:</label>
                <input type="text" class="form-control" name="fullName" value={this.state.fullName} onChange={this.onChange} placeholder="FullName" />
              </div>
              <div class="form-group">
                <label for="address">Address:</label>
                <input type="text" class="form-control" name="address" value={this.state.address} onChange={this.onChange} placeholder="Address" />
              </div>
              <div class="form-group">
                <label for="city">City:</label>
                <input type="text" class="form-control" name="city" value={this.state.city} onChange={this.onChange} placeholder="City" />
              </div>
              <div className="form-group">
                <label htmlFor="zip">Zip:</label>
                <input type="text" className="form-control" name="zip" value={this.state.zip}
                       onChange={this.onChange} placeholder="Zip"/>
              </div>
              <div className="form-group">
                <label htmlFor="telephone">Telephone:</label>
                <input type="text" className="form-control" name="telephone" value={this.state.telephone}
                       onChange={this.onChange} placeholder="Telephone"/>
              </div>
              <div className="form-group">
                <label htmlFor="content">Content:</label>
                <input type="text" className="form-control" name="content" value={this.state.content}
                       onChange={this.onChange} placeholder="Content"/>
              </div>
              {/*<div className="form-group">*/}
              {/*  <label htmlFor="content">Content:</label>*/}
              {/*  <textArea class="form-control" name="content" onchange={this.onChange} placeholder="Content" cols="80"*/}
              {/*            rows="3">{this.state.content}</textArea>*/}
              {/*</div>*/}

              <button type="submit" className="btn btn-success">Change</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
