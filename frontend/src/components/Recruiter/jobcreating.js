import React, { Component } from 'react';
import axios from 'axios';
import {Row} from "react-bootstrap"
import { RecruiterNavBar } from '../templates/Navbar'

import ls from "local-storage"
import {Link} from "react-router-dom"

export default class Jobcreating extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // type: 'JobApplicant',
            // FirstName: '',
            // LastName: '',
            // email: '',
            // password: '',
            // date: null,
            // usr: true,
            // skill: [],
            // education: [],
            // bio: '',
            // contact: ''

            title: '',
            recruiterid: '',
            recruitername: '',
            maxapplicant: '',
            positions: '',
            postingdate: '',
            deadlinedate: '',
            requiredskills: [],
            typeofjob: 'WFH',
            duration: '',
            salary: '',
            rating: 0
        }
        // this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.onChangePassword = this.onChangePassword.bind(this);
        // this.onChangeType = this.onChangeType.bind(this);
        // // this.onChangeContact = this.onChangeContact.bind(this);
        // this.onChangeContact = this.onChangeContact.bind(this);
        // this.onChangeBio = this.onChangeBio.bind(this);
        // this.onChangeFirstName = this.onChangeFirstName.bind(this);
        // this.onChangeLastName = this.onChangeLastName.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        // this.onChangeEducation = this.onChangeEducation.bind(this);
        // this.onChangeSkill = this.onChangeSkill.bind(this);
        // this.onDeleteEducation = this.onDeleteEducation.bind(this);
        // this.onDeleteSkill = this.onDeleteSkill.bind(this);
        // this.onAddEducation = this.onAddEducation.bind(this);
        // this.onAddSkill = this.onAddSkill.bind(this);

        this.onChangeRecruiterName = this.onChangeRecruiterName.bind(this);
        this.onChangeRecruiterId = this.onChangeRecruiterId.bind(this);
        this.onChangeMaxApplicant = this.onChangeMaxApplicant.bind(this);
        this.onChangePositions = this.onChangePositions.bind(this);
        this.onChangePostingdate = this.onChangePostingdate.bind(this);
        this.onChangeDeadlinedate = this.onChangeDeadlinedate.bind(this);
        this.onChangeRequiredSkill = this.onChangeRequiredSkill.bind(this);
        this.onAddRequiredSkill = this.onAddRequiredSkill.bind(this);
        this.onDeleteRequiredSkill = this.onDeleteRequiredSkill.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeTypeofJob = this.onChangeTypeofJob.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);


    }

    // componentDidMount() {
    //     axios.get('http://localhost:4000/user')
    //         .then(response => {

    //             console.log(response.data)
    //             this.setState({ users: response.data.filter(word => word.email == this.props.match.params.id) });
    //             console.log(this.state.users);

    //             console.log(this.props.match.params.id)
    //             // this.updateusername();
    //             this.setState({
    //                 FirstName: this.state.users[0].FirstName,
    //                 LastName: this.state.users[0].LastName,
    //                 email: this.state.users[0].email,
    //                 contact: this.state.users[0].contact,
    //                 bio: this.state.users[0].bio
    //             });
    //             console.log(this.state.users[0].contact);
    //         })
    // }


    onChangeTitle(event) {
        this.setState({ title: event.target.value });
    }

    onChangeRecruiterName(event) {
        this.setState({ recruitername: event.target.value });
    }

    onChangeRecruiterId(event) {
        this.setState({ recruiterid: event.target.value });
    }

    onChangeMaxApplicant(event) {
        this.setState({ maxapplicant: event.target.value });
    }

    onChangePositions(event) {
        this.setState({ positions: event.target.value });
    }

    onChangePostingdate(event) {
        this.setState({ postingdate: event.target.value });
    }

    onChangeDeadlinedate(event) {
        this.setState({ deadlinedate: event.target.value });
    }

    onChangeTypeofJob(event) {
        this.setState({ typeofjob: event.target.value });
    }

    onChangeDuration(event) {
        this.setState({ duration: event.target.value });
    }

    onChangeSalary(event) {
        this.setState({ salary: event.target.value });
    }


    onChangeRequiredSkill(index, obj) {

        this.setState({

            requiredskills: this.state.requiredskills.map((obj1, index1) => {
                return index === index1 ? obj : obj1;
            }),
        });
    }

    onAddRequiredSkill(obj) {
        this.setState({

            requiredskills: [...this.state.requiredskills, obj],

        });

    }

    onDeleteRequiredSkill(index) {
        this.setState({

            requiredskills: this.state.requiredskills.filter((obj1, index1) =>
                index1 !== index

            ),
        });

    }

    onSubmit(e) {
        e.preventDefault();

        const newJob = {

            title: this.state.title,
            recruiterid: this.state.recruiterid,
            postingdate: this.state.postingdate,
            deadlinedate: this.state.deadlinedate,
            recruitername: this.state.recruitername,
            maxapplicant: this.state.maxapplicant,
            positions: this.state.positions,
            remainingjobs: this.state.positions,
            salary: this.state.salary,
            requiredskills: this.state.requiredskills,
            typeofjob: this.state.typeofjob,
            duration: this.state.duration,
            rating: this.state.rating
        }
        console.log(newJob);
        axios.post('http://localhost:4000/user/jobcreating', newJob)
            .then(res => {
                alert("The Job has been Created by the title :  \t" + res.data.title);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    alert("This Job Title Already Exists");
                }
                if (err.response.status === 400) {
                    alert("Please Try Again Later ! ");
                }
            });

        this.setState({
            title: '',
            recruitername: '',
            postingdate: '',
            requiredskills: [],
            typeofjob: '',
            deadlinedate: '',
            positions: '',
            duration: '',
            salary: '',
            recruiterid: '',
            maxapplicant: '',
            rating: 0
        });
    }


    render() {
        // const usr = this.state.usr;
        return (
            <div style={{ border: "2px solid black", padding: "10px" }}>
                <RecruiterNavBar />
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div>
                            <h3> Recruiter Email Id: (please give your current email) </h3>
                        </div>
                        <div>

                            <input type="email"
                                placeholder="Enter Email"
                                required
                                className="form-control"
                                value={this.state.recruiterid}
                                onChange={this.onChangeRecruiterId}
                            />
                        </div>

                    </div>
                    <Row>
                    <div className="form-group col">
                        <div>
                            <h3> Job Title(unique) </h3>
                        </div>
                        <div>

                            <input type="text"
                                placeholder="Enter Job Title"
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                            />
                        </div>

                    </div>



                    <div className="form-group col">
                        <div>
                            <h3> Salary: </h3>
                        </div>
                        <div>

                            <input type="number"
                                max="1000000"
                                min="0"
                                placeholder="Enter Salary"
                                className="form-control"
                                value={this.state.salary}
                                onChange={this.onChangeSalary}
                            />
                        </div>

                    </div>

                    </Row>

                    <Row>

                    <div className="form-group col">
                        <div>
                            <h3> Recruiter Name: </h3>
                        </div>
                        <div>

                            <input type="text"
                                placeholder="Enter Recruiter Name"
                                className="form-control"
                                value={this.state.recruitername}
                                onChange={this.onChangeRecruiterName}
                            />
                        </div>

                    </div>
                    <div className="form-group col">
                        <div>
                            <h3> Total Applicants : </h3>
                        </div>
                        <div>

                            <input type="number"
                                placeholder="Max Applicants"
                                className="form-control"
                                value={this.state.maxapplicant}
                                onChange={this.onChangeMaxApplicant}
                            />
                        </div>

                    </div>

                    </Row>
                    <Row>

                    <div className="form-group col">
                        <div>
                            <h3> Total Positions: </h3>
                        </div>
                        <div>

                            <input type="number"
                                // min="0"
                                required
                                placeholder="Enter Total Positions"
                                className="form-control"
                                value={this.state.positions}
                                onChange={this.onChangePositions}
                            />
                        </div>

                    </div>
                    <div className="form-group col">
                        <div>
                            <h3> Posting Date: </h3>
                        </div>
                        <div>

                            <input type="date"
                                placeholder="Enter date of posting"
                                className="form-control"
                                value={this.state.postingdate}
                                onChange={this.onChangePostingdate}
                            />
                        </div>

                    </div>
                    </Row>
                    <Row>

                    <div className="form-group col">
                        <div>
                            <h3> Deadline: </h3>
                        </div>
                        <div>

                            <input type="datetime-local"
                                placeholder="Enter Deadline"
                                className="form-control"
                                value={this.state.deadlinedate}
                                onChange={this.onChangeDeadlinedate}
                            />
                        </div>

                    </div>

                    <div className="form-group col">
                        <div>
                            <h3>Type of Job: </h3>
                        </div>

                        <select className="form-control"
                            value={this.state.typeofjob}
                            onChange={this.onChangeTypeofJob}>
                            <option value="Part Time">Part Time </option>
                            <option value="Full Time">Full Time </option>
                            <option value="WFH">WFH </option>

                        </select>
                    </div>
                    </Row>

                    <div className="form-group">
                        <div>
                            <h3> Duration in months: (0 (indefinite) - 6 months)</h3>
                        </div>
                        <div>

                            <input type="number"
                                min="0"
                                max="6"
                                placeholder="Enter Duration"
                                className="form-control"
                                value={this.state.duration}
                                onChange={this.onChangeDuration}
                            />
                        </div>

                    </div>

                    <div className="form-group" style={{ border:"2px solid black" ,borderRadius:"10px" ,padding:"20px" }} >
                        <h2>Skills Required : </h2>
                        <div>

                            <button
                                style={{ marginLeft: "8px" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.onAddRequiredSkill("");
                                }}
                            >
                                Add
                    </button>
                        </div>
                        {this.state.requiredskills.map((obj, id) => {
                            return (
                                <div>
                                    <label>Language: </label>
                                    <input
                                        required
                                        value={obj.language}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            this.onChangeRequiredSkill(id, {
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
                                                this.onDeleteRequiredSkill(id);
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
                        <input type="submit" value="Create Job" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}