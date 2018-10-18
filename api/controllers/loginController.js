var mongoose = require('mongoose');
var database = require('./../../config/database.js');
var User = require('../models/user.js')

exports.login_attempt = function(req,res){
  // req.assert('email','Email is not valid').isEmail();
  // req.assert('email','Email cannot be blank').notEmpty();
  // req.assert('password','Password cannot be blank').notEmpty();
  //
  // var errors = req.validationErrors();
  // var msg = "Login failed due to these reason(s):\n";
  // if(errors){
  //   for (var i=0 in errors){
  //     msg += "- "+errors[i].msg +"\n"
  //   }
  //   res.status(400)
  //   return res.send(msg);
  // }
  if(req.body.email && req.body.password){
    User.authenticate(req.body.email, req.body.password, function(error, user){

      if(!user){
        var err = new Error('Wrong email');
        err.status = 401;
        return res.json("Email does not exist!");

      } else if(error){
        var err = new Error('Wrong password');
        err.status = 401;
        return res.json("Password incorrect!");

      } else{
        req.session.userId = user._id;
        // req.session.name = user.name;

        req.session.email = user.email;
        res.status(200)
        return res.send("login success!");
      }
    })

  } else {
    var err= new Error('All fields required.');
    err.status = 400;
    return res.json("All fields required.");
  }
}

exports.logout = function(req,res,next){
  if(req.session){
    //delete session object
    req.session.destroy(function(err){
      if(err){
        return next(err);
      } else{
        return res.redirect('/');
      }
    });
  }
}
