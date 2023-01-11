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
import { ApplicantNavBar } from '../templates/Navbar'
import ls from 'local-storage'

class Jobview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            job: [],
            rating: 0

        };
    }

    onChangeRating = job => (e) => {
        console.log("entered here");
        axios.post('http://localhost:4000/user/apprating', {
            userid: ls.get("currentuser"),
            jobtitle: job.title,
            rating: Number(e.target.value)
        }).then(() => { window.location.reload() }).catch(function (error) {
            console.log(error);
        });
    }



    componentDidMount() {
        axios.get('http://localhost:4000/user/jobview/' + ls.get("currentuser"))
            .then(response => {
                let arr = [];
                for (const job of response.data) {
                    let temp = job;
                    for (const app of job.application) {
                        if (app.applicant_id == ls.get("currentuser")) {
                            temp.app = app;
                        }
                    }
                    arr.push(temp);
                }
                this.setState({
                    job: arr
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (

            <div>
                <ApplicantNavBar />
                <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>DOJ</TableCell>
                                    <TableCell>Recruiter Name</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Salary Per Month</TableCell>
                                    <TableCell>Rate</TableCell>
                                    <TableCell>Status</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.job.map((job, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{new Date(job.postingdate).toLocaleString()}</TableCell>
                                        <TableCell>{job.recruitername}</TableCell>
                                        <TableCell>{job.title}</TableCell>
                                        <TableCell>{job.salary}</TableCell>
                                        <TableCell>{job.app.status == 'Accepted' ? <input type="number"
                                            min="1"
                                            max="5"
                                            value={job.finalrating}
                                            onChange={this.onChangeRating(job)}
                                        /> : "--"}</TableCell>
                                        <TableCell>{job.app.status}</TableCell>

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
export default Jobview;




