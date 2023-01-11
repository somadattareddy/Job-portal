import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import UsersList from './components/Users/UsersList'
import Home from './components/Common/Home'
import Login from './components/Common/Login'
import Register from './components/Common/Register'
import Jobcreating from './components/Recruiter/jobcreating'
import RecruiterProfile from './components/Recruiter/profile'
import JobApplicantProfile from './components/JobApplicant/profile'
import Jobapply from './components/JobApplicant/jobapply'
import Jobview from './components/JobApplicant/jobview'
import Activejobs from './components/Recruiter/activejobs'
import Viewapplicants from './components/Recruiter/viewapplicants'
import Acceptedapplicants from './components/Recruiter/acceptedapplicants'

function App() {
  return (
    <Router>
      <div className="container">
      
        <Route path="/" exact component={Home}/>
        <Route path="/users" exact component={UsersList}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile/recruiter/:id" name="profileid" exact component={RecruiterProfile} />
        <Route path="/profile/applicant/:id" name="profileid" exact component={JobApplicantProfile} />
        <Route path="/profile/recruiter/:id/jobcreating" exact name="profileid"  component={Jobcreating} />
        <Route path="/profile/applicant/:id/jobapply" exact name="profileid"  component={Jobapply} />
        <Route path="/profile/applicant/:id/viewjob" exact name="profileid"  component={Jobview} />
        <Route path="/profile/recruiter/:id/activejobs" exact name="profileid"  component={Activejobs} />
        <Route path="/viewjob/:title" exact name="profileid"  component={Viewapplicants} />
        <Route path="/profile/recruiter/:id/viewapplicants" exact name="profileid"  component={Acceptedapplicants} />


      </div>
    </Router>
  );
}

export default App;
