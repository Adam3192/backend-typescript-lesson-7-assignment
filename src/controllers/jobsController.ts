import { RequestHandler } from "express";
import { Job } from "../models/Job";
import { jobList } from '../models/job-data';
import mysql, { FieldInfo, MysqlError } from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'sqluser',
    password: 'password',
    database: `mydb`
});

db.connect((err: MysqlError) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
});

export const defaultJobs: RequestHandler = (req, res, next) => {
    res.redirect('/jobs');
}

export const getAllJobs: RequestHandler = (req, res, next) => {
    let myQuery = `SELECT * FROM jobs`;
    db.query(myQuery, (err: MysqlError, data: any, fields: FieldInfo) => {
        if (err) {
            res.send(err);
        }
        res.render('all-jobs', {
            jobList: data
        })
    });
}

export const getJobById: RequestHandler = (req, res, next) => {

    let jobId = req.params.jobId;

    let myQuery = `SELECT * FROM jobs WHERE jobId='${jobId}' LIMIT 1`;
    
    db.query(myQuery, (err: MysqlError, data: any, fields: FieldInfo) => {
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
        })
    });
}

export const addJobPage: RequestHandler = (req, res, next) => {
    res.render('addJob');
}

export const createJob: RequestHandler = (req, res, next) => {
    let newJob: Job = req.body;
    let myQuery = `INSERT INTO jobs (companyName, jobTitle, description, yearsWorked) VALUES ('${newJob.companyName}', '${newJob.jobTitle}', '${newJob.description}', '${newJob.yearsWorked}')`;
    
    db.query(myQuery, (err: MysqlError, data: any, fields: FieldInfo) => {
        if (err) {
            return res.send(err);
        }
        console.log(data);
        res.redirect('/jobs');
    });
}

export const deleteJob: RequestHandler = (req, res, next) => {
    let jobId: string = req.params.jobId;
    let myQuery = `DELETE FROM jobs WHERE jobId=${jobId}`;

    db.query(myQuery, (err: MysqlError, data: any, fields: FieldInfo) => {
        if (err) {
            return res.send(err);
        }
        console.log(data);
        res.redirect('/jobs');
    });
}