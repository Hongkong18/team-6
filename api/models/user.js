var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');



var userSchema = new Schema({
  name: {type: String, required: true},
  phoneNo: {type: Number, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
//0 - admin, 1 - doctor, 2 - patient
  roles:{type:Number, default: false},
  gender : {type: String},
  updatedAt: {type:Date, default: Date.now()}

});

//authenticate input against db
userSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {

      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('Company not found.');
        err.status = 401;
        return callback(err);
      }

      bcrypt.compare(password, user.password, function (err, result) {

        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing pw before saving to database
userSchema.pre('save',function(next){
  var company = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if(err){
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var Company = mongoose.model('Company', companySchema);
module.exports = Company;
