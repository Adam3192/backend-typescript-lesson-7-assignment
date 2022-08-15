"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
class Job {
    constructor(id, jobTitle, companyName, yearsWorked, description) {
        this.id = id;
        this.jobTitle = jobTitle;
        this.companyName = companyName;
        this.yearsWorked = yearsWorked;
        this.description = description;
    }
}
exports.Job = Job;
