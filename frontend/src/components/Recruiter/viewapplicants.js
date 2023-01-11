import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Fuse from 'fuse.js';
import { RecruiterNavBar } from '../templates/Navbar'
import ls from 'local-storage'

class Viewapplicants extends Component {

    constructor(props) {
        super(props);
        this.state = {
            job: {}


        };

    }


    componentDidMount() {
        const jobtitle = window.location.pathname.split('/')[2];
        // console.log(jobtitle);
        axios.get('http://localhost:4000/user/jobget/' + jobtitle)
            .then(response => {

                this.setState({

                    job: response.data
                });
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        const job = this.state.job;
        // console.log(job==={}?"Hi":"bye");
        return (
            job.application ? <div>
                <RecruiterNavBar />
                < Button style={{
                    backgroundColor: '#12824C',
                    color: '#FFFFFF'
                }} onClick={e => {
                    this.setState(
                        { job: {...this.state.job, application:this.state.job.application.sort((a, b) => a.applicantname < b.applicantname ? -1 : 1) }})
                }}
                >
                    Sort by Name
                </Button>
                < Button style={{
                    backgroundColor: '#12824C',
                    color: '#FFFFFF'
                }} onClick={e => {
                    this.setState(
                        { job: {...this.state.job, application:this.state.job.application.sort((a, b) => a.applicantname >b.applicantname ? -1 : 1) }})
                }}
                >
                    Sort by Name Desc
                </Button>
                {/* /// */}
                < Button style={{
                    backgroundColor: '#12824C',
                    color: '#FFFFFF'
                }} onClick={e => {
                    this.setState(
                        { job: {...this.state.job, application:this.state.job.application.sort((a, b) => a.applicationdate < b.applicationdate ? -1 : 1) }})
                }}
                >
                    Sort by DOA
                </Button>
                < Button style={{
                    backgroundColor: '#12824C',
                    color: '#FFFFFF'
                }} onClick={e => {
                    this.setState(
                        { job: {...this.state.job, application:this.state.job.application.sort((a, b) => a.applicationdate >b.applicationdate ? -1 : 1) }})
                }}
                >
                    Sort by DOA Desc
                </Button>
                {/* //// */}
                {/* /// */}
                < Button style={{
                    backgroundColor: '#12824C',
                    color: '#FFFFFF'
                }} onClick={e => {
                    this.setState(
                        { job: {...this.state.job, application:this.state.job.application.sort((a, b) => a.userrating < b.userrating ? -1 : 1) }})
                }}
                >
                    Sort by App. Rating
                </Button>
                < Button style={{
                    backgroundColor: '#12824C',
                    color: '#FFFFFF'
                }} onClick={e => {
                    this.setState(
                        { job: {...this.state.job, application:this.state.job.application.sort((a, b) => a.userrating >b.userrating ? -1 : 1) }})
                }}
                >
                    Sort by App. Rating Desc
                </Button>
                {/* //// */}
                <Grid item xs={12} md={9} lg={9}>
                    <Paper>

                        <Table size="small">
                            <TableHead>

                                <TableRow>
                                    <TableCell>Applicant Name</TableCell>
                                    <TableCell>Skills</TableCell>
                                    <TableCell>Date of Application</TableCell>
                                    <TableCell>Education</TableCell>
                                    <TableCell>SOP</TableCell>
                                    <TableCell>Rating</TableCell>
                                    <TableCell>Stage of Application</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.job.application.map((app, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{app.applicantname}</TableCell>
                                        <TableCell>{JSON.stringify(app.skills)}</TableCell>
                                        <TableCell>{app.applicationdate}</TableCell>
                                        <TableCell>{JSON.stringify(app.edudet)}</TableCell>
                                        <TableCell>{app.sop}</TableCell>
                                        <TableCell>{app.userrating}</TableCell>
                                        <TableCell>{app.status}</TableCell>
                                        <TableCell>{app.status == "Applied" ? <Button style={{ backgroundColor: '#FFFF00', color: '#FFFFFF' }}
                                            onClick={e => {
                                                e.preventDefault();
                                                const tempv = { appid: app.applicant_id, status: "Shortlisted" };
                                                const jobtitle = window.location.pathname.split('/')[2];

                                                axios.post("http://localhost:4000/user/statusupdate/" + jobtitle, tempv).then(res => { window.location.reload() }).catch(err => { alert("Error") });
                                            }} >Shortlist</Button> : (app.status == "Shortlisted" ? <Button style={{ backgroundColor: '#12824C', color: '#FFFFFF' }} onClick={() => { app.status = "Accepted" }}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    const tempv = { appid: app.applicant_id, status: "Accepted" };
                                                    const jobtitle = window.location.pathname.split('/')[2];

                                                    axios.post("http://localhost:4000/user/statusupdate/" + jobtitle, tempv).then(res => { window.location.reload() }).catch(err => { alert("Error") });
                                                }}>Accept</Button> : <Fragment></Fragment>)} </TableCell>
                                        <TableCell>{app.status == "Applied" || app.status == "Shortlisted" ? <Button style={{ backgroundColor: '#FF0000', color: '#FFFFFF	' }} onClick={() => { app.status = "Rejected" }}
                                            onClick={e => {
                                                e.preventDefault();
                                                const tempv = { appid: app.applicant_id, status: "Rejected" };
                                                const jobtitle = window.location.pathname.split('/')[2];

                                                axios.post("http://localhost:4000/user/statusupdate/" + jobtitle, tempv).then(res => { window.location.reload() }).catch(err => { alert("Error") });
                                            }}>Reject</Button> : <Fragment></Fragment>} </TableCell>


                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </div> : <Fragment>

                </Fragment>
        )
    }
}
export default Viewapplicants;




