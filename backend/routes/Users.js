var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Jobdetails = require("../models/Jobdetails");


// GET request 
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db

router.post("/register", (req, res) => {
    const email = req.body.email;
    // console.log(req.body);
    User.findOne({ email }).then(user => {
        if (!user) {
            const newUser = new User({

                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                email: req.body.email,
                date: req.body.date,
                type: req.body.type,
                password: req.body.password
            });
            // console.log(user);
            if (req.body.type == 'Recruiter') {
                newUser.contact = req.body.contact
            }
            else {
                newUser.education = req.body.education

            }
            if (req.body.type == 'JobApplicant') {
                newUser.skill = req.body.skill
            }
            else {
                newUser.bio = req.body.bio
            }
            newUser.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
        else {
            return res.status(404).json({
                error: "You already have  an account :/ ",
            });
        }
    });
});

router.post("/jobcreating", (req, res) => {
    const title = req.body.title;
    // console.log(req.body);
    // console.log("hi");
    Jobdetails.findOne({ title }).then(job => {
        if (!job) {
            const newJobdetail = new Jobdetails({

                title: req.body.title,
                recruiterid: req.body.recruiterid,
                recruitername: req.body.recruitername,
                maxapplicant: req.body.maxapplicant,
                positions: req.body.positions,
                remainingjobs: req.body.positions,
                postingdate: req.body.postingdate,
                deadlinedate: req.body.deadlinedate,
                requiredskills: req.body.requiredskills,
                typeofjob: req.body.typeofjob,
                duration: req.body.duration,
                salary: req.body.salary,
                rating: req.body.rating
            });

            newJobdetail.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).send(err);
                });
        }
        else {
            return res.status(404).json({
                error: "You already have  an account :/ ",
            });
        }
    });
});



router.post("/apply/:title", function (req, res) {
    const title = req.params.title;
    Jobdetails.findOne({ title }).then(job => {
        if (!job) {
            return res.status(404).json({
                error: "Cannot apply, please select a new job!",
            });
        }
        else {
            User.findOne({ email: req.body.applicant_id }).then(user => {
                if (user.count >= 10) {
                    return res.status(401).send("You have applied for  10 jobs! ");
                }
                job.application = [...job.application, req.body];

                job.save()
                    .then(job => {
                        res.status(200).json(job);

                        user.count = user.count + 1;
                        user.save().then().catch(console.log);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send(err);
                    });
            });
            // console.log(req.body);

        }
    })
        .catch(e => {
            res.status(400).send(e);
            console.log(e);
        });
});


router.get("/job/:userid", function (req, res) {
    Jobdetails.find(function (err, jobs) {

        if (err) {
            console.log(err);
        } else {
            // let jobs=data;
            for (const job of jobs) {
                job.applied = false;
                // console.log(job.application);
                for (const app of job.application) {

                    if (app && app.applicant_id == req.params.userid) {
                        job.applied = true;
                        break;
                    }
                }
                console.log(job);
            }
            res.json(jobs);
        }
    })
});


router.get("/jobview/:userid", function (req, res) {
    Jobdetails.find(function (err, jobs) {

        if (err) {
            console.log(err);
        } else {
            temparr = []
            for (const job of jobs) {
                for (const app of job.application) {

                    if (app && app.applicant_id == req.params.userid) {
                        job.finalrating=app.rating;
                        temparr.push(job);
                        break;
                    }
                }
                // console.log(job);
            }
            res.json(temparr);
        }
    })
});

router.post("/apprating", (req, res) => {
    const { jobtitle, userid, rating } = req.body;
    // console.log(req.body);
    Jobdetails.findOne({ title: jobtitle }).then(
        job => {
            // console.log(job);
            for (const app of job.application) {
                if (app.applicant_id == userid) {
                    app.rating = rating;
                    let sum = 0;
                    let cnt = 0;
                    for (const app of job.application) {
                        if (app.status == 'Accepted' && app.rating > 0) {
                            sum += app.rating;
                            cnt++;
                        }
                    }
                    // console.log(sum);
                    // console.log(cnt);
                    job.finalrating = sum / cnt;
                    // console.log(job.finalrating);
                    return job.save().then(job => res.send(job))
                        .catch(err => res.status(400).send(err))
                }
            }
            res.status(404).send("Application Not Found")
        }
    )
        .catch(e => {
            res.status(400).send(e);
            console.log(e);
        });
});

router.post("/profileedit", (req, res) => {
    const email = req.body.email;
    User.findOne({ email }).then(user => {
        if (user) {
            for (const key in req.body) {
                user[key] = req.body[key];
            }
            // console.log(user);
            user.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
        else {
            return res.status(404).json({
                error: "You don't have  an account :/ ",
            });
        }
    });
});

router.post("/jobedit", (req, res) => {
    const updatedjob = req.body;
    // console.log(updatedjob);
    Jobdetails.findOne({ title: updatedjob.title }).then(job => {
        if (job) {
            for (const key in updatedjob) {
                job[key] = updatedjob[key];
            }
            // console.log(job);
            job.save()
                .then(job => {
                    res.status(200).json(job);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
        else {
            return res.status(404).json({
                error: "No job found :/ ",
            });
        }
    }).catch(e => {
        res.status(400).send(e);
        console.log(e);
    });
});

router.get("/acceptedapplicants/:id", (req, res) => {
    let mainarr = [];
    let i = 0;
    Jobdetails.find({ recruiterid: req.params.id }).then(jobs => {
        jobs.map(job => {
            let arr = [];
            // console.log(job);
            job.application.map(app => {

                User.findOne({ email: app.applicant_id }).then(user => {
                    let temp = { ...app._doc, applicantname: user.FirstName + " " + user.LastName, skills: user.skill, edudet: user.education, userrating: user.userrating };
                    // temp.applicantname = user.FirstName + " " + user.LastName;
                    arr.push(temp);
                    // console.log(i);
                    // i++;
                    // job.application=app;
                    // console.log(temp);
                }).catch(e => {
                    res.status(400).send(e);
                    console.log(e);
                });
            })


            setTimeout(() => {
                let temp = { ...job._doc, application: arr };
                // job.application = arr;

                // console.log(arr);
                // console.log(temp);
                mainarr.push(temp);
            }, 1000);
            // res.send(job)
        })
        setTimeout(() => { res.send(mainarr) }, 2000)

    });
})



router.post("/ratingfromrec", (req, res) => {
    const { jobtitle, userid, rating } = req.body;
    Jobdetails.findOne({ title: jobtitle }).then(job => {
        for (const app of job.application) {
            if (app.applicant_id == userid) {
                app.ratingfromrec = rating;
                job.save().then(job => {
                    res.send("OK");
                }).catch(e => {
                    res.status(400).send(e);
                    console.log(e);
                });
                return "OK";
            }
        }
        res.status(400).send("Application not found");

    }).catch(e => {
        res.status(400).send(e);
        console.log(e);
    });
});

router.post("/jobdelete", (req, res) => {
    const deletedjob = req.body.title;
    // console.log(req.body);
    Jobdetails.findOne({ title: deletedjob }).then(job => {
        if (job) {
            for (const app of job.application) {
                User.updateMany({
                    email: app.applicant_id,
                }, { $inc: { 'count': -1 } }, { multi: true }).then().catch(console.log)
            }
            Jobdetails.deleteOne({ title: deletedjob }).then(job => res.send("OK")).catch(e => {
                res.status(400).send(e);
                console.log(e);
            });
        }
        else {
            return res.status(404).json({
                error: "No job found :/ ",
            });
        }
    }).catch(e => {
        res.status(400).send(e);
        console.log(e);
    });
});

router.get("/activejobs/:recruiterid", (req, res) => {
    Jobdetails.find({ recruiterid: req.params.recruiterid }).then(jobs => {
        jobs = jobs.filter(job => job.remainingjobs > 0)
        // console.log(jobs)
        res.send(jobs);
    }).catch(e => {
        res.status(400).send(e);
        console.log(e);
    });

});

router.get("/jobget/:title", (req, res) => {
    let arr = [];
    Jobdetails.findOne({ title: req.params.title }).then(job => {
        // console.log(typeof job);
        job.application.map(app => {
            User.findOne({ email: app.applicant_id }).then(user => {
                let temp = { ...app._doc, applicantname: user.FirstName + " " + user.LastName, skills: user.skill, edudet: user.education, userrating: user.userrating };
                // temp.applicantname = user.FirstName + " " + user.LastName;
                arr.push(temp);

                // job.application=app;
                // console.log(temp);
            }).catch(e => {
                res.status(400).send(e);
                console.log(e);
            });
        })


        setTimeout(() => {
            let temp = { ...job._doc, application: arr };
            // job.application = arr;

            // console.log(arr);
            // console.log(temp);
            res.send(temp)
        }, 1000);
        // res.send(job)
    }).catch(e => {
        res.status(400).send(e);
        console.log(e);
    });
});

router.post("/statusupdate/:title", (req, res) => {
    const appid = req.body.appid;
    // console.log(req.body);
    Jobdetails.findOne({ title: req.params.title }).then(job => {
        if (job) {
            for (const app of job.application) {
                if (app.applicant_id == appid) {

                    app.status = req.body.status
                    if (app.status == "Accepted") {
                        job.remainingjobs = job.remainingjobs - 1;
                    }

                    // console.log(job);
                    return job.save().then(job => res.send(job))
                        .catch(err => res.status(400).send(err))
                }
            }
            // console.log(job);
            job.save()
                .then(job => {
                    res.status(200).json(job);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
        else {
            return res.status(404).json({
                error: "No job found :/ ",
            });
        }
    }).catch(e => {
        res.status(400).send(e);
        console.log(e);
    });
});


// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }

        else {
            if (user.password == password) {
                // res.send("Email Found");
                return res.json(user.type);
            }
            else {

                return res.status(404).json({
                    error: "Password is incorrect !",
                });
            }
        }
    });
});

module.exports = router;

