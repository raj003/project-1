var mongoose = require('mongoose');

const failjobschema = mongoose.Schema({
    companyTitle: String,
    jobTitle: String,
    location: String,
    date: String,
    userId: String
});

const flSchema = module.exports = mongoose.model('flSchema',failjobschema,'failjoblist');