import React, { Component } from 'react';
import axios from 'axios';

export default class Recruiter extends Component {

    constructor(props) {
        super(props);

        this.state = {

            contact: '',
            bio: ''

        }
        // this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.onChangePassword = this.onChangePassword.bind(this);
        // this.onChangeType = this.onChangeType.bind(this);
        // this.onChangeContact = this.onChangeContact.bind(this);
        // this.onChangeBio = this.onChangeBio.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
    }

    // onChangeContact(event) {
    //     this.setState({ contact: event.target.value });
    // }
    // onChangeBio(event) {
    //     this.setState({ bio: event.target.value });
    // }

    render() {
        return (
            <div>

                <div className="form-group">
                    <div>
                        <h3>Contact: </h3>
                    </div>
                    <input type="tel"
                        placeholder="Phone-Number"
                        pattern="[0-9]{10}"
                        className="form-control"
                        value={this.props.contact}
                        onChange={this.props.contactChange}
                        // onChange={e=>console.log(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <div>
                        <h3>Bio: (max 250 words) </h3>
                    </div>

                    <textarea
                        className="form-control"
                        maxLength="250"
                        value={this.props.bio}
                        onChange={this.props.changeBio}
                    />
                </div>


            </div>
        )
    }
}