var User = require('../models/user');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var database = require('./../../config/database.js');
var Request = require("request");


exports.user_sign_up = function(req,res){
  //form validator
    // req.assert('name','Name cannot be blank').notEmpty();
    // req.assert('email', 'Email is not valid').isEmail();
    // req.assert('email','Email cannot be blank').notEmpty();
    // req.assert('password','Password must be at least 6 characters long').len(6);
    // req.assert('phoneNo','Registry Number must be numeric').isNumeric();
    // req.assert('phoneNo', 'Registry Number cannot be blank').notEmpty();



    // var errors = req.validationErrors();
    // var msg = "Registration failed due to these reason(s):\n";
    // if(errors){
    //   for (var i=0 in errors){
    //     msg += "- "+errors[i].msg +"\n"
    //   }
    //   res.status(400)
    //   return res.send(msg);
    // }

    var user = new User();
    user.name = req.body.name;
    user.phoneNo = req.body.phoneNo;
    user.email = req.body.email;
    user.password = req.body.password;
    user.roles = req.body.roles;
    user.gender = req.body.gender;



    user.save(function(err){
      if(err){
        // msg +=  "-Account with the same email / registry number already exists!\n";
        res.status(401)
        return res.send("error saving account")
      }

    //session cookie
      console.log(user)
      req.session.userId = user._id;
      req.session.name = user.name;
      req.session.email = user.email;
      return res.json('200');
    })
}
