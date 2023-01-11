import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import {RecruiterNavBar} from '../templates/Navbar'

class  RecruiterProfile  extends Component  {

    constructor(props) {
        super(props);
        this.state = {
            FirstName: '',
            LastName: '',
            email: '',
            contact: '',
            bio: ''
            // users: []

        };
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    onChangeFirstName(event) {
        this.setState({ FirstName: event.target.value });
    }
    onChangeLastName(event) {
        this.setState({ LastName: event.target.value });
    }
    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangeContact(event) {
        this.setState({ contact: event.target.value });
    }
    onChangeBio(event) {
        this.setState({ bio: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        // console.log("hello");
        axios.post('http://localhost:4000/user/profileedit', this.state)
            .then(res => {
                alert("User " + res.data.FirstName + " " + res.data.LastName + " Created ");
            })
            .catch(err => {
                if (err.response.status === 400) {
                    alert("Error in saving ! Please try again later");
                }
                else {
                    alert("You are already registered!");
                }
            });
    }
    componentDidMount() {
        axios.get('http://localhost:4000/user')
            .then(response => {

                console.log(response.data)
                this.setState({ users: response.data.filter(word => word.email == this.props.match.params.id) });
                console.log(this.state.users);

                console.log(this.props.match.params.id)
                // this.updateusername();
                this.setState({
                    FirstName: this.state.users[0].FirstName,
                    LastName: this.state.users[0].LastName,
                    email: this.state.users[0].email,
                    contact: this.state.users[0].contact,
                    bio: this.state.users[0].bio
                });
                console.log(this.state.users[0].contact);
            })
    }

    render() {
        return (

            <div>
                <RecruiterNavBar/>

                <form onSubmit={this.onSubmit}>
                <div style={{border:"2px solid black", borderRadius:"20px",padding:"20px", margin:"10px"}}>
                    <div className="form-group">
                        <div>

                            <h3>Email: </h3>
                        </div>
                        <div>

                            <input type="email"
                                placeholder="Enter Email"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                readOnly
                            />
                        </div>

                    </div>
                    <div className="form-group">
                        <div>

                            <h3>FirstName: </h3>
                        </div>

                        <input type="text"
                            placeholder="First Name"
                            className="form-control"
                            value={this.state.FirstName}
                            onChange={this.onChangeFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <h3>LastName: </h3>
                        <input type="text"
                            placeholder="Last Name"

                            className="form-control"
                            value={this.state.LastName}
                            onChange={this.onChangeLastName}
                        />
                    </div>
                    </div>
                    <div style={{border:"2px solid black", borderRadius:"20px",padding:"20px", margin:"10px"}}>

                    <div className="form-group">
                        <div>
                            <h3>Contact: </h3>
                        </div>
                        <input type="tel"
                            placeholder="Phone-Number"
                            pattern="[0-9]{10}"
                            className="form-control"
                            value={this.state.contact}
                            onChange={this.onChangeContact}
                        />
                    </div>
                    <div className="form-group">
                        <div>
                            <h3>Bio: (max 250 words) </h3>
                        </div>

                        <textarea
                            className="form-control"
                            maxLength="250"
                            value={this.state.bio}
                            onChange={this.onChangeBio}
                        />
                    </div>
                </div>
                    


                    <div className="form-group">
                        <input type="submit" value="Save" onSubmit={this.onSubmit} className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
export default RecruiterProfile;




