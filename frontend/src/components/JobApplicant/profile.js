import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import {ApplicantNavBar} from '../templates/Navbar'

class JobApplicantProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            FirstName: '',
            LastName: '',
            email: '',
            education: [],
            skill: [],
            // users: []

        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEducation = this.onChangeEducation.bind(this);
        this.onChangeSkill = this.onChangeSkill.bind(this);
        this.onDeleteEducation = this.onDeleteEducation.bind(this);
        this.onDeleteSkill = this.onDeleteSkill.bind(this);
        this.onAddEducation = this.onAddEducation.bind(this);
        this.onAddSkill = this.onAddSkill.bind(this);
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
    onChangeEducation(index, obj) {

        this.setState({

            education: this.state.education.map((obj1, index1) => {
                return index === index1 ? obj : obj1;
            }),
        });
    }

    onAddEducation(obj) {
        this.setState({

            education: [...this.state.education, obj],

        });

    }

    onDeleteEducation(index) {
        this.setState({

            education: this.state.education.filter((obj1, index1) =>
                index1 !== index

            ),
        });

    }
    onChangeSkill(index, obj) {

        this.setState({

            skill: this.state.skill.map((obj1, index1) => {
                return index === index1 ? obj : obj1;
            }),
        });
    }

    onAddSkill(obj) {
        this.setState({

            skill: [...this.state.skill, obj],

        });

    }

    onDeleteSkill(index) {
        this.setState({

            skill: this.state.skill.filter((obj1, index1) =>
                index1 !== index

            ),
        });

    }

onSubmit(e)
{
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
                    education: this.state.users[0].education,
                    skill: this.state.users[0].skill
                });
                // console.log(this.state.users[0].contact);
            })
    }

    render() {
        return (

            <div>
                <ApplicantNavBar/>
                <form onSubmit={this.onSubmit}>
                   


                <div style={{border:"2px solid black", borderRadius:"20px",padding:"20px", margin:"10px"}}>
                    <div className="form-group">
                        <div>

                            <h3>Email:</h3>
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


                    <div className="form-group" style={{border:"2px solid black", borderRadius:"20px",padding:"20px", margin:"10px"}}>
                        <div>
                            <h3>Education: </h3>
                        </div>
                        <div>
                            <button
                                style={{ margin: "8px" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.onAddEducation("");
                                }}
                            >
                                Add
                        </button>
                        </div>
                        {this.state.education.map((obj, id) => {
                            return (
                                <div style={{ border: "2px solid black", padding: "10px", margin:"5px" }}>
                                    <div>
                                        <h3>
                                            Name of Institute :
                                </h3>
                                    </div>
                                    <div>
                                        <input
                                            required
                                            value={obj.institute}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                this.onChangeEducation(id, {
                                                    ...obj,
                                                    institute: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>

                                        <h3>
                                            Starting Year:
                                    </h3>
                                    </div>
                                    <div>

                                        <input
                                            required
                                            type="number"
                                            max="2035"
                                            min="1980"
                                            value={obj.startYear}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                this.onChangeEducation(id, {
                                                    ...obj,
                                                    startYear: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>

                                        <h3>
                                            Ending Year:
                                    </h3>
                                    </div>
                                    <div>

                                        <input
                                            required
                                            type="number"
                                            max="2035"
                                            min="1980"
                                            value={obj.endYear}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                this.onChangeEducation(id, {
                                                    ...obj,
                                                    endYear: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>

                                        <button
                                            style={{ marginTop: "8px" }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.onDeleteEducation(id);
                                            }}
                                        >
                                            Delete
                                </button>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                    <div className="form-group" style={{border:"2px solid black", borderRadius:"20px",padding:"20px", margin:"10px"}} >
                        <h3>Skill: </h3>
                        <div>

                            <button
                                style={{ marginLeft: "8px" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.onAddSkill("");
                                }}
                            >
                                Add
                    </button>
                        </div>
                        {this.state.skill.map((obj, id) => {
                            return (
                                <div>
                                    <label>Language: </label>
                                    <input
                                        required
                                        value={obj.language}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            this.onChangeSkill(id, {
                                                ...obj,
                                                language: e.target.value,
                                            });
                                        }}
                                    />


                                    <div>

                                        <button
                                            style={{ marginTop: "8px" }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.onDeleteSkill(id);
                                            }}
                                        >
                                            Delete
                                    </button>
                                    </div>


                                </div>
                            )
                        })}
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Save" onSubmit={this.onSubmit} className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
export default JobApplicantProfile;




