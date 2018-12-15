var mongoose = require('mongoose');

const jobSchema = mongoose.Schema( {
    company: String,
    jobtitle: String,
    location: String,
    jobtytpe: String,
    jobdescription: String
});

const Jobs = module.exports = mongoose.model('Jobs',jobSchema,'jobdetail');