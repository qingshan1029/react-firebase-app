import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection('boards');
    this.state = {
      fullName: '',
      address: '',
      city: '',
      zip: '',
      telephone: '',
      content: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { fullName, address, city, zip, telephone, content } = this.state;

    const { userInfo } = this.props
    alert('kkj succeed?')
    alert(userInfo)

    this.ref.add({
      fullName,
      address,
      city,
      zip,
      telephone,
      content,
    }).then((docRef) => {
      this.setState({
        fullName: '',
        address: '',
        city: '',
        zip: '',
        telephone: '',
        content: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { fullName, address, city, zip, telephone, content } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title" style={{color:'Tomato'}}>
              Add Personal Information
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Personal List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="fullName">FullName:</label>
                <input type="text" class="form-control" name="fullName" value={fullName} onChange={this.onChange} placeholder="FullName" />
              </div>
              <div class="form-group">
                <label for="address">Address:</label>
                <input type="text" class="form-control" name="address" value={address} onChange={this.onChange} placeholder="Address" />
              </div>
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input type="text" className="form-control" name="city" value={city} onChange={this.onChange}
                       placeholder="City"/>
              </div>
              <div className="form-group">
                <label htmlFor="zip">Zip:</label>
                <input type="text" className="form-control" name="zip" value={zip} onChange={this.onChange}
                       placeholder="Zip"/>
              </div>
              <div className="form-group">
                <label htmlFor="telephone">Telephone:</label>
                <input type="text" className="form-control" name="telephone" value={telephone} onChange={this.onChange}
                       placeholder="Telephone"/>
              </div>
              <div className="form-group">
                <label htmlFor="content">Content:</label>
                <input type="text" className="form-control" name="content" value={content} onChange={this.onChange}
                       placeholder="Content"/>
              </div>
              {/*<div className="form-group">*/}
              {/*  <label htmlFor="content">Content:</label>*/}
              {/*  <textArea class="form-control" name="content" onchange={this.onChange} placeholder="Content"*/}
              {/*            cols="80" rows="3">{content}</textArea>*/}
              {/*</div>*/}
              <button type="submit" class="btn btn-success">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
