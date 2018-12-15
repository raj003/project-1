var mongoose = require('mongoose');

const joblistSchema = mongoose.Schema({
    companyTitle: String,
    jobTitle: String,
    location: String,
    date: String,
    userId: String
});

const JlSchema = module.exports = mongoose.model('JlSchema',joblistSchema,'joblist');
