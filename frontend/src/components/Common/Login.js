import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import Navbar from '../templates/Navbar'
import ls from "local-storage"

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            date: null,
            gotoprofile: false,
            type:''
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password,
            date: Date.now(),
        }
        axios.post('http://localhost:4000/user/login', newUser)
            .then(res => {
                alert("Login successful\t");
                ls.set("currentuser", newUser.email);
                this.setState({
                    gotoprofile: true,
                    type:res.data
                })
            })
            .catch(err => {
                if (err.response.status === 400) {
                    alert("Email not found . Please Register");
                }
                else {
                    alert("Password Incorrect ! ");
                }
            });
            // this.setState({
            //     gotoprofile: true
            // })

        // this.setState({
        //     email: '',
        //     password: '',
        //     date: null
        // });
    }

    render() {
        if (this.state.gotoprofile) {
            var id = this.state.email;
            // console.log(id);
            if(this.state.type==='Recruiter')
            return <Redirect to={`/profile/recruiter/${id}`} />
            if(this.state.type=='JobApplicant')
            return <Redirect to={`/profile/applicant/${id}`} />

        }
        return (
            <div>
                <Navbar />

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                            placeholder="Password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}