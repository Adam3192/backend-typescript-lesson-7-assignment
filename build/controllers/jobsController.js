"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.createJob = exports.addJobPage = exports.getJobById = exports.getAllJobs = exports.defaultJobs = void 0;
const mysql_1 = __importDefault(require("mysql"));
const db = mysql_1.default.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'sqluser',
    password: 'password',
    database: `mydb`
});
db.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
});
const defaultJobs = (req, res, next) => {
    res.redirect('/jobs');
};
exports.defaultJobs = defaultJobs;
const getAllJobs = (req, res, next) => {
    let myQuery = `SELECT * FROM jobs`;
    db.query(myQuery, (err, data, fields) => {
        if (err) {
            res.send(err);
        }
        res.render('all-jobs', {
            jobList: data
        });
    });
};
exports.getAllJobs = getAllJobs;
const getJobById = (req, res, next) => {
    let jobId = req.params.jobId;
    let myQuery = `SELECT * FROM jobs WHERE jobId='${jobId}' LIMIT 1`;
    db.query(myQuery, (err, data, fields) => {
        if (err) {
            return res.send(err);
        }
        console.log(data);
        if (data.length == 0) {
            return res.status(404).render('error', {
                message: "This is not the URL you are looking for!"
            });
        }
        let foundJob = data[0];
        res.render('job-detail', {
            foundJob
        });
    });
};
exports.getJobById = getJobById;
const addJobPage = (req, res, next) => {
    res.render('addJob');
};
exports.addJobPage = addJobPage;
const createJob = (req, res, next) => {
    let newJob = req.body;
    let myQuery = `INSERT INTO jobs (companyName, jobTitle, description, yearsWorked) VALUES ('${newJob.companyName}', '${newJob.jobTitle}', '${newJob.description}', '${newJob.yearsWorked}')`;
    db.query(myQuery, (err, data, fields) => {
        if (err) {
            return res.send(err);
        }
        console.log(data);
        res.redirect('/jobs');
    });
};
exports.createJob = createJob;
const deleteJob = (req, res, next) => {
    let jobId = req.params.jobId;
    let myQuery = `DELETE FROM jobs WHERE jobId=${jobId}`;
    db.query(myQuery, (err, data, fields) => {
        if (err) {
            return res.send(err);
        }
        console.log(data);
        res.redirect('/jobs');
    });
};
exports.deleteJob = deleteJob;
