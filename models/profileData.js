var mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    about: String,
    education: String,
    expirence: String,
    resume: {
        data: Buffer,
        contentType: String
    },
    profilepic: {
        data: Buffer,
        contentType: String
    }
});

const profiles = module.exports = mongoose.model('profiles',profileSchema,'profiles');