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

class Activejobs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],


        };

    }

    onClickTitle = (title) => (e) => {
        e.preventDefault()
        window.location="/viewjob/"+title
    }

    onChangemaxapp = (tjob) => {
        return e => {
            this.setState({
                jobs: this.state.jobs.map(job => {
                    if (job.title == tjob.title)
                        return { ...tjob, maxapplicant: Number(e.target.value) };
                    else
                        return job;
                })
            })
        }

    }
    onChangeposition = (tjob) => {
        return e => {
            this.setState({
                jobs: this.state.jobs.map(job => {
                    if (job.title == tjob.title)
                        return { ...tjob, positions: Number(e.target.value) };
                    else
                        return job;
                })
            })
        }

    }
    onChangedeadlinedate = (tjob) => {
        return e => {
            this.setState({
                jobs: this.state.jobs.map(job => {
                    if (job.title == tjob.title)
                        return { ...tjob, deadlinedate: (e.target.value) };
                    else
                        return job;
                })
            })
        }

    }

    componentDidMount() {
        axios.get('http://localhost:4000/user/activejobs/' + ls.get("currentuser"))
            .then(response => {

                this.setState({
                    jobs: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (

            <div>
                <RecruiterNavBar />
                <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>DOP</TableCell>
                                    <TableCell>No. of Applicants</TableCell>
                                    <TableCell>Remaining Number of App.</TableCell>
                                    <TableCell>Edit No. of Positions</TableCell>
                                    <TableCell>Edit Max Applicants</TableCell>
                                    <TableCell>Edit Deadline of Application</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.jobs.map((job, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell onClick={this.onClickTitle(job.title)} >{job.title}</TableCell>
                                        <TableCell>{new Date(job.postingdate).toLocaleString()}</TableCell>
                                        <TableCell>{job.positions - job.remainingjobs}</TableCell>
                                        <TableCell>{job.remainingjobs}</TableCell>
                                        <TableCell><input type="number"
                                            value={job.maxapplicant} onChange={this.onChangemaxapp(job)} /> </TableCell>
                                        <TableCell><input type="number"
                                            value={job.positions} onChange={this.onChangeposition(job)} /> </TableCell>
                                        <TableCell><input type="datetime-local"
                                            value={((a) => { return a.toLocaleDateString("fr-CA") + "T" + a.toLocaleTimeString() })(new Date(job.deadlinedate))} onChange={this.onChangedeadlinedate(job)} /> </TableCell>
                                        <TableCell  ><Button onClick={e => {
                                            e.preventDefault();
                                            axios.post('http://localhost:4000/user/jobedit', job).then(response => {
                                                window.location.reload()
                                            }).catch(
                                                err => alert("Error")
                                            )
                                        }}>
                                            Update
                                        </Button>

                                        </TableCell>
                                        <TableCell  ><Button onClick={e => {
                                            e.preventDefault();
                                            axios.post('http://localhost:4000/user/jobdelete', { title: job.title }).then(response => {
                                                window.location.reload()
                                            }).catch(
                                                err => { console.log(err); alert("Error") }
                                            )
                                        }}>
                                            Delete
                                        </Button>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </div>
        )
    }
}
export default Activejobs;




