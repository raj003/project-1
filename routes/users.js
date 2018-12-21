const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
const User = require('../models/user');
const jobdetail = require('../models/jobs');
const jobList = require('../models/jobList');
const fljobList = require('../models/failedjoblist');
const savedjobsList = require('../models/savedjobslist');
const profiles = require('../models/profileData');
const dialogflow = require('dialogflow');
const appliedJobs = require('../models/appliedJobs');
var linkAddress = 'http://localhost:8100/#/reset/';

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        phone:req.body.phone,
        location:req.body.location,
        title:req.body.title,
        company:req.body.company,
        education:req.body.education
      });

      User.addUser(newUser, (err, user) => {
        if(err){
          res.json({success: false, msg:'Failed to register user'});
        } else {
          res.json({success: true, msg:'User registered'});
        }
      });
});

/// Update User
router.put('/update/:id', function(req, res, next) {
  let updatedUser = {};
  updatedUser.name = req.body.name;
  updatedUser.email = req.body.email;
  updatedUser.username = req.body.username;
  updatedUser.phone = req.body.phone;
  updatedUser.location = req.body.location;
  updatedUser.title = req.body.title;
  updatedUser.company = req.body.company;
  updatedUser.education = req.body.education;
console.log('ReqData:::::',req);

var id = req.params.id;
console.log(id);
User.findOne({_id: id}, function(err, foundObject){
  if(err) {
    console.log(err);
    res.status(500).send();
  } else {
    if (!foundObject) {
      res.status(404).send();
    } else {
       if (req.body.title) {
         console.log('choice');
         foundObject.title = req.body.title;
       }
       foundObject.save(function(err, updatedObject){
         if (err) { console.log(err);
          res.status(500).send();
        } else {
          res.send(updatedObject);
        }
       })
    }
  }
})


  let query = {_id:req.params.id};
  console.log(req.params.id);
console.log(query,updatedUser);
  User.update(query, updatedUser, function(err) {
    if(err) {console.log(err);return;}
    else { console.log('HipHip hurry sucess')}

  })

})


router.put('/user/:id', function(req, res){
  console.log(req.params.id);
	User.findByIdAndUpdate({_id: req.params.id},
	                   {
                      name: req.body.name,
                      email: req.body.email,
                      username: req.body.username,
                      phone:req.body.phone,
                      location:req.body.location,
                      title:req.body.title,
                      company:req.body.company,
                      education:req.body.education
			   }, function(err, docs){
			 	if(err) res.json(err);
				else
				{

           res.json(docs);
           console.log(docs);
           //res.send(docs);
				 }
			 });
});



// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

//get job details
router.get('/jobdetail', function(req,res) {
  console.log('fetching jobs');
  jobdetail.find(function(err,jobs) {
    if(err) {
      console.log(err);
    }
    else {
      res.json(jobs);
    }
  });
});


// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

//post appliedjoblist
router.post('/joblist', function(req,res) {
  console.log('posting');
  jobList.create({
    companyTitle: req.body.companyTitle,
    jobTitle: req.body.jobTitle,
    location: req.body.location,
    date: req.body.AppliedDate,
    userId: req.body.userId
  },function(err,list) {
    if (err) {
      console.log('err getting list '+ err);
    } else {
      res.json(list);
    }
  }
  );
});

//getting appliedjoblistlist
  router.get('/joblist/:userId', (req,res) => {
    console.log('Retriving the applied jobs');
    jobList.find({userId: req.params.userId}, (err, list) => {
      if(err) {
        console.log('error in getting applied jobs ' + err);
      }
      else if(list) {
        return res.json(list)
      }
    })
  })

//getting failed jobs
router.get('/failjoblist/:id',function(req,res) {
  console.log('getting failed job');
  fljobList.find({userId: req.params.id},function(err,list) {
    if(err) {
      res.send(err);
    } else {
      res.json(list);
    }
  });
});

// posting the failed job
router.post('/failjoblist' , (req,res) => {
  console.log('posting the failed job');
  fljobList.create({
    companyTitle: req.body.companyTitle,
    jobTitle: req.body.jobTitle,
    location: req.body.location,
    date: req.body.date,
    userId: req.body.userId
  }, (err, list) => {
    if (err) {
      res.send('cannot post the job ' + err)
    } else {
      res.json(list)
    }
  });
});

//getting saved jobs
router.get('/savedjobList/:id',function(req,res) {
  console.log('gettin saved jobs');
  savedjobsList.find({userId: req.params.id},function(err,savedlist) {
    if(err) {
      res.send('error in getting saved jobs '+ err);
    } else {
      res.json(savedlist);
    }
  });
});
//posting to saved jobs
router.post('/savedjobList', function(req,res) {
  console.log('posting saved job');
  savedjobsList.create({
    companyTitle: req.body.companyTitle,
    jobTitle: req.body.jobTitle,
    location: req.body.location,
    date: req.body.date,
    userId: req.body.userId
  }, function(err,savedlist) {
    if (err) {
      res.send('enable send the data to DB '+ err);
    }
    else {
      res.json(savedlist);
    }
  });
});

//to check whether email exist or not for resetPassword functionality
router.post('/forgot', function(req,res,next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err,buf) {
        var token = buf.toString('hex');
        done(err,token);
      });
    }, function(token,done) {
      User.findOne({email: req.body.email}, function(err,user) {
        if(!user) {
          return res.json({success: false, msg: 'User not found'});
        }
        user.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 3600000;
        user.save(function(err) {
          done(err, token, user);
        });
      });
    }, function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'astepfourward@gmail.com',
          pass: 'raj@123456'
        }
      });
      var mailOptions = {
        //to: user.email,
        to: 'astepfourward@gmail.com',
        from: 'astepfourward@gmail.com',
        subject: 'for password reset',
        text: 'please click below link to reset password '+ linkAddress + token
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('email sent to ' + user.email);

        done(err,'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    return res.json({success: true, msg: 'User found'})
  });
});



//to update the new password
router.put('/reset/:token', function(req, res, next) {
  console.log('reseting the password');
  User.findOne({resetPasswordToken:req.params.token}, function(err, user) {
    if(err) {
      return next(err);
    }
    if (!user) {
      return res.status(422).json({errors: [{msg: 'invalid reset token'}]});
    }
    console.log(user);
    user.resetPasswordToken ='';
    user.resetPasswordExpires = '';
    user.password = req.body.password;
    User.restPass(user, (err, user) => {
      if(err){
        res.json({success: false, msg:'password has not changed'});
      } else {
        res.json({success: true, msg:'password has changed'});
      }
    });
  });
});
//    ends here.


// for profile
router.put('/profile/:id', function(req,res) {
  User.findByIdAndUpdate({_id: req.params.id},
  {
    education: req.body.education,
    expirence: req.body.expirence,
    about: req.body.about,
    profilePic: req.body.profilePic,
    resume: req.body.resume
  }, function(err,profile) {
    if(err) {
      res.send('err in updating profile ' + err);
    } else {
      res.json(profile);
    }
  })
})

// delete a user
router.delete('/register/:id', function(req,res) {
  User.findByIdAndRemove({_id: req.params.id},
    function(err , delMsg) {
      if(err) {
        res.send('err in deleting the user ' + err);
      } else {
        return res.json({success: true, msg: 'Account deleted'});
      }
    }
  );
});

// registering the linkedin user
router.post('/linkedinuser', function(req,res) {
  console.log('Receiving linkedin data');
  //const linkedin_id = req.body.linkedin_id;
  User.findOne({linkedin_id: req.body.linkedin_id}, function(err, linkedinUser) {
    if(err) {
      console.log('err in finding linkedin user '+err);
    }
    // if user exits
    else if(linkedinUser) {
      console.log('user exist');
      const token = jwt.sign(linkedinUser.toJSON(), config.secret, {expiresIn: 604800});
      res.json({success: true, token: 'JWT '+token, user: {
          id: linkedinUser._id,
          linkedin_id: linkedinUser.linkedin_id,
          name: linkedinUser.name,
          username: linkedinUser.username,
          email: linkedinUser.email,
          lkprofilePic: linkedinUser.profilePic
        }, msg: 'user exits'
      });
    }
    // if user doesn't exist
    else {
      User.create({
        linkedin_id: req.body.linkedin_id,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        lkprofilePic: req.body.lkprofilePic
      }, function(err, result) {
        if(err) {
          res.json({success: false, msg: 'failed to add'})
          console.log('error in adding the data '+err);
        }
        else if(result) {
          console.log(typeof(result));
          const token = jwt.sign(result.toJSON(),config.secret,{ expiresIn: 604800 });
          res.json({success: true, token: 'JWT '+token, user: {
            id: result._id,
            linkedin_id: result.linkedin_id,
            name: result.name,
            username: result.username,
            email: result.email,
            lkprofilePic: result.profilePic
          }, msg: 'User added '  });
        }
      });
    }
  });

});

//    dialoflow code
router.post('/dialogflow', function(req,res) {
  console.log('reached here');
  const projectId = "js-interview";
  const LANGUAGE_CODE = 'en-US';
  const sessionId = req.body.sessionId;
  var query = req.body.query;

  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId,sessionId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: LANGUAGE_CODE,
      },
    },
  };

  sessionClient.detectIntent(request).then(response => {
    console.log('intent detected');
    const result = response[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    if(result.fulfillmentText) {
      console.log(result.fulfillmentText);
      return res.json({reply: result.fulfillmentText})
    }
    // if(result.intent) {
    //   console.log(`  Intent: ${result.intent.displayName}`)
    // }
    else {
      console.log('no intent found');
    }
  }).catch(err => {
    console.log('error '+err);
  })
  
})

// facebook request ---------------------------------------------
router.post('/facebookuser', function(req,res) {
  console.log('facebook request');
  User.findOne({linkedin_id: req.body.id}, function(err,currentUser) {
    if(err) {
      console.log('err in finding facebook user '+ err);
    }
    else if(currentUser) {
      console.log('user already exits');
      const token = jwt.sign(currentUser.toJSON(), config.secret, { expiresIn: 604800 });
      res.json({success: true, token: 'JWT '+token, user: {
        id: currentUser._id,
        linkedin_id: currentUser.linkedin_id,
        name: currentUser.name,
        username: currentUser.username,
        email: currentUser.email,
        //lkprofilePic: currentUser.profilePic
      }, msg: 'user exits'
    });
    }
    else if(!currentUser) {
      User.create({
        linkedin_id: req.body.id,
        name: req.body.first_name,
        username: req.body.username,
        email: req.body.email,
        //lkprofilePic: req.body.picture
      }, function(err,result) {
        if(err) {
           res.json({success: false, msg: 'failed to add'})
           console.log(err);
        }
        else {
          const token = jwt.sign(result.toJSON(), config.secret, { expiresIn: 604800 });
          res.json({success: true, token: 'JWT '+token, user: {
            id: result._id,
            linkedin_id: result.linkedin_id,
            name: result.name,
            username: result.username,
            email: result.email,
            //lkprofilePic: result.profilePic
          }, msg: 'User added '  }); 
        }
      });
    }
  });
});


module.exports = router;
