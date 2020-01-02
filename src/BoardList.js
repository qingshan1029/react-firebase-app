import React, { Component } from 'react';
import firebase from './Firebase';
import {Link} from "react-router-dom";

class BoardList extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('boards');
        this.unsubscribe = null;
        this.state = {
            boards: [],
        };

    }

    onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
            const { fullName, address, city, zip, telephone, content } = doc.data();
            boards.push({
                key: doc.id,
                doc, // DocumentSnapshot
                fullName,
                address,
                city,
                zip,
                telephone,
                content,
            });
        });
        this.setState({
            boards
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }
    refCallback = () => {
        const {userInfo} = this.props
        alert('kkj-mapping create')
        alert(userInfo)
    }
    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <br/><br/><br/>
                        <h3 className="panel-title text-left">
                        Personal Info List
                    </h3>
                    </div>

                    <div className="panel-body">
                        <h4 align="left"><Link to="/create" class="btn btn-primary" userInfo={this.props.userInfo} > Add Info</Link></h4>
                        <table className="table table-stripe">
                            <thead>
                            <tr>
                                <th>FullName</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Zip</th>
                                <th>Telephone</th>
                                <th>Content</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.boards.map(board =>
                                <tr>
                                    <td><Link to={`/show/${board.key}`}>{board.fullName}</Link></td>
                                    <td>{board.address}</td>
                                    <td>{board.city}</td>
                                    <td>{board.zip}</td>
                                    <td>{board.telephone}</td>
                                    <td>{board.content}</td>
                                 </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );

    }

}

export default BoardList;

