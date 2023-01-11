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
class Jobapply extends Component {

    constructor(props) {
        super(props);
        this.state = {
            job: [], sortedUsers: [], sortName1: true,

            sortName2: true,
            sortName3: true,
            min: 0,
            max: Infinity,
            job_type: ["Full Time", "Part Time", "WFH"],
            value_job_type: '',
            duration: ['0', '1', '2', '3', '4', '5', '6'],
            value_duration: '',
            query: '',
            sop: '',
            doj: '',
            applicationdate: '',
            jobtitle: ''

        };
        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.onChangeminmax = this.onChangeminmax.bind(this);
        this.handleQuery = this.handleQuery.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fuckoff = this.fuckoff.bind(this);
        this.sop = this.sop.bind(this);
    }

    sop() {

        if (!this.state.jobtitle) {
            return <Fragment> </Fragment>
        }
        else {
            return (<div className="form-group">
                <div>
                    <div>
                        <h3>SOP: (max 250 words) </h3>
                    </div>
                </div>

                <textarea
                    className="form-control"
                    maxLength="250"
                    value={this.state.sop}
                    onChange={e => {
                        this.setState(
                            { sop: e.target.value })
                    }}
                />
                <div>

                    <div className="form-group">
                        <div>

                            <input type="submit" value="Submit SOP"
                                onClick={this.onSubmit(this.state.jobtitle)}
                                className="btn btn-primary" />
                        </div>
                    </div>
                </div>

            </div>)

        }

    }


    handleQuery(event) {
        this.setState({ query: event.target.value });
    }

    onSubmit(jobtitle) {
        return e => {
            e.preventDefault();
            // alert(jobtitle);
            const application = {
                applicant_id: ls.get("currentuser"),
                rating: this.state.appliedJobRating,
                status: 'Applied',
                sop: this.state.sop,
                applicationdate: Date.now(),
                joiningdate: this.state.doj,
            }
            console.log(application);
            // console.log("wtf");
            // console.log(this.state.jobtitle);
            // var temp = this.state.job.find(word => word.title === this.state.jobtitle).application;
            // var flag = 0;
            // for (var i = 0; i < temp.length; i++) {
            //     if (temp[i].applicant_id == application.applicant_id) {
            //         flag = 1;

            //     }
            // }
            // if (flag == 1) {
            //     alert("You have already applied for this job");
            // }
            // else {
            axios.post('http://localhost:4000/user/apply/' + jobtitle, application)
                .then(res => {
                    alert("Applied for\t" + res.data.title);
                    console.log("alerted")
                    console.log(res)
                    window.location.reload();

                })
                .catch(err => {
                    if (err.response.status === 400) {
                        // console.log(this.state.jobtitle);
                        alert("Some error occured");
                    }
                    if (err.response.status === 404) {
                        alert("Already registered!");
                        // console.log(this.state.jobtitle);

                    }
                    if (err.response.status === 401) {
                        alert("You have applied for 10 jobs!");
                    }
                });
        }
        // }

    }



    fuckoff() {
        // console.log(this.state.sortedUsers);
        // const fuse = new Fuse(this.state.job,{
        //     keys: ['title']
        // });
        // var finaljob = fuse.search(this.state.query);
        // this.state.job=[]
        // finaljob.forEach(element => {
        //     console.log(element.item);
        //     this.state.job.push(element.item);            
        // });

        if (this.state.query === '') {
            this.setState({
                sortedUsers: this.state.job
            });
        }
        else {
            const fuse = new Fuse(this.state.job, {
                keys: ['title']
            });
            var finaljob = fuse.search(this.state.query);
            var temp = [];
            finaljob.forEach(element => {
                console.log(element.item);
                temp.push(element.item);
            });

            this.setState({
                sortedUsers: temp
            });

        }



    }


    componentDidMount() {
        axios.get('http://localhost:4000/user/job/' + ls.get("currentuser"))
            .then(response => {
                this.setState({
                    job: response.data.filter(word => (new Date(word.deadlinedate)).getTime() > Date.now()),
                    sortedUsers: response.data.filter(word => (new Date(word.deadlinedate)).getTime() > Date.now())
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onChangeminmax(event) {
        const min_val = this.state.min;
        var arraytemp = this.state.job;
        var array = [];
        const max_val = this.state.max;
        var j = 0;
        if (max_val && 0 < min_val) {
            // var i = 0;
            for (var i = 0; i < arraytemp.length; ++i) {
                if (max_val >= arraytemp[i].salary && min_val <= arraytemp[i].salary) {
                    j++;
                    array.push(arraytemp[i]);
                    // console.log(i);
                }
            }
        } else {
            if (max_val > 0) {

                for (var i = 0; i < arraytemp.length; i++) {
                    if (max_val >= arraytemp[i].salary) {
                        j++;
                        // console.log(i);

                        array.push(arraytemp[i]);
                    }
                }
            }
            if (max_val <= 0) {
                if (min_val > 0) {
                    j++;
                    for (var i = 0; i < arraytemp.length; i++) {
                        j++;
                        if (min_val <= arraytemp[i].salary) {
                            j++;
                            array.push(arraytemp[i]);
                        }
                    }
                } else {
                    array = this.state.job;
                    j++;
                    // console.log("inside");

                }
            }
        }
        this.setState({
            sortedUsers: array,
        });
    }

    sortChange(flag, id) {

        var array = this.state.sortedUsers;
        var j = 0;
        if (this.state.min.length > 0 || this.state.max.length > 0) {
            j++;
            array = this.state.sortedUsers;
            // console.log(j);
        }
        else {
            j--;
            array = this.state.sortedUsers;
            console.log(j);

        }
        array.sort(function (a, b) {
            if (id === 1) {
                return flag ? (a.salary - b.salary) : (b.salary - a.salary);
            }

            if (id === 2) {
                return flag ? a.duration - b.duration : b.duration - a.duration;
            } if (id === 3) {
                return flag ? (a.finalrating - b.finalrating) : -(-b.finalrating + a.finalrating);

            }
        });
        if (id === 1) {
            this.setState({
                sortedUsers: array,
                sortName1: !this.state.sortName1,
            });
        } else {
            if (id === 2) {
                this.setState({
                    sortedUsers: array,
                    sortName2: !this.state.sortName2,
                });
            } else {
                if (id === 3) {
                    this.setState({
                        sortedUsers: array,
                        sortName3: !this.state.sortName3,
                    });
                }
            }
        }
        if ((this.state.min.length == 0) && (this.state.max.length == 0)) {
            j++;
            array = this.state.sortedUsers;
            // console.log(j);
        }
    }

    renderIcon() {
        if (this.state.sortName) {
            return (
                <ArrowDownwardIcon />
            )
        }
        else {
            return (
                <ArrowUpwardIcon />
            )
        }
    }

    render() {
        return (
            <div>
            <div>
                <ApplicantNavBar />
                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem text>
                                <h3>Filters</h3>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <List component="nav" aria-label="mailbox folders">
                            <TextField
                                id="standard-basic"
                                label="Search"
                                fullWidth={true}
                                value={this.state.query}
                                onChange={this.handleQuery}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <IconButton onClick={this.fuckoff}>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </List>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">

                            <ListItem button>
                                <form noValidate autoComplete="off">
                                    <label>Salary</label>
                                    <TextField id="standard-basic" value={this.state.min}
                                        label="Enter Min" fullWidth={true} onChange={e => {
                                            this.setState({ min: e.target.value })
                                        }} />
                                    <TextField id="standard-basic" value={this.state.max}
                                        label="Enter Max" fullWidth={true} onChange={e => {
                                            this.setState({ max: e.target.value })
                                        }} />
                                    <Button sz="md" onClick={this.onChangeminmax} >
                                        [Search on min max]</Button>
                                </form>
                            </ListItem>
                            <Divider />
                            <ListItem button divider>
                                <Autocomplete
                                    value={this.state.value_job_type}
                                    onChange={(event, value) => {
                                        console.log(value);
                                        var val = this.state.job.filter(word => word.typeofjob == value);
                                        this.setState({
                                            sortedUsers: val,
                                            min: '',
                                            max: '',
                                            value_duration: ''
                                        });
                                    }}
                                    id="combo-box-demo"
                                    options={this.state.job_type}
                                    getOptionLabel={(option) => option}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Search Job type" variant="outlined" />}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem button divider>
                                <Autocomplete
                                    value={this.state.value_duration}

                                    onChange={(event, value) => {
                                        console.log(value);
                                        var val = this.state.job.filter(word => word.duration == value);
                                        this.setState({
                                            sortedUsers: val,
                                            min: '',
                                            max: '',
                                            value_job_type: ''
                                        });
                                    }}
                                    id="combo-box-demo"
                                    options={this.state.duration}
                                    getOptionLabel={(option) => option}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Search Durantion" variant="outlined" />}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> <Button onClick={() => { 
                                            this.sortChange(this.state.sortName1, 1) }}>{this.renderIcon(this.state.sortName1)}
                                            </Button>Salary</TableCell>
                                        <TableCell> 
                                            <Button onClick={() => { 
                                                this.sortChange(this.state.sortName3, 3) }}>{this.renderIcon(this.state.sortName2)}
                                                </Button>Rating</TableCell>
                                        <TableCell> 
                                            <Button onClick={() => { 
                                                this.sortChange(this.state.sortName2, 2) }}>{this.renderIcon(this.state.sortName3)}
                                                </Button>Duration</TableCell>
                                        <TableCell>
                                            Email</TableCell>
                                        <TableCell>
                                            Recruiter Name</TableCell>
                                        <TableCell>
                                            Title</TableCell>
                                        <TableCell>
                                            Deadline</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.sortedUsers.map((job, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>
                                                {job.salary}</TableCell>
                                            <TableCell>
                                                {job.finalrating}</TableCell>
                                            <TableCell>
                                                {job.duration}</TableCell>
                                            <TableCell>
                                                {job.recruiterid}</TableCell>
                                            <TableCell>
                                                {job.recruitername}</TableCell>
                                            <TableCell>
                                                {job.title}</TableCell>
                                            <TableCell>
                                                {job.deadlinedate}</TableCell>
                                            {job.applied ? <Button style={{
                                                backgroundColor: '	#FFFF00',
                                                color: '#FFFFFF'
                                            }} >
                                                Applied
                                            </Button> : (job.remainingjobs > 0 ?
                                             < Button style={{
                                                    backgroundColor: '#12824C',
                                                    color: '#FFFFFF'
                                                }} onClick={e => {
                                                    this.setState(
                                                        { jobtitle: job.title })
                                                }}
                                                >
                                                    Apply Now
                                            </Button> : <Button style={{
                                                        backgroundColor: '	#FF0000',
                                                        color: '#FFFFFF'
                                                    }} >
                                                        Full
                                                    </Button>)

                                            }
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
                { this.sop()}
            </div >
            </div >
        )
    }
}

export default Jobapply;