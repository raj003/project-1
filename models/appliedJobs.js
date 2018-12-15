var mongoose = require('mongoose');

const appliedJobsList = mongoose.Schema({
    companyTitle: String,
    jobTitle: String,
    location: String,
    date: String,
    userId: String,
});

const aJSchema = module.exports = mongoose.model('aJSchema', appliedJobsList,'appliedJobs');