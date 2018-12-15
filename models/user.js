const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  linkedin_id: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
    
  },
  phone: {
    type: String
  },
  location: {
    type: String
  },
  title:{
    type: String
  },
  company:{
    type: String
  },
  education:{
    type: String
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  resume: {
    data: Buffer,
    contentType: String
  },
  profilePic: {
    data: Buffer,
    contentType: String
  },
  about: {
    type: String
  },
  expirence: {
    type: String
  },
  lkprofilePic: {
    type: String
  }
});

  const User = module.exports = mongoose.model('User', UserSchema);

  module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
  }

  module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
  }

  module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  }

  module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }

  module.exports.restPass = function(user, callback){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err) throw err;
        user.password = hash;
        user.save(callback);
      });
    });
  };
