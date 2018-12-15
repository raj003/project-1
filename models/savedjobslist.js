var mongoose = require('mongoose');

const savedlistSchema = mongoose.Schema({
    companyTitle: String,
    jobTitle: String,
    location: String,
    date: String,
    userId: String
});

const saveSchema = module.exports = mongoose.model('saveSchema',savedlistSchema,'savedjobList');