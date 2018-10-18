exports.requiresLogin = function(req, res, next) {
  if (req.session && (req.session.userId || req.session.email)) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}

exports.requiresLogOut = function(req,res,next){
  if (req.session && (req.session.userId || req.session.email)) {
    var err = new Error('You must be logged out to view this page.');
    err.status = 401;
    return next(err);
  } else {
    return next();
  }
}


exports.loginStatus = function(req,res,next){
  if(req.session && (req.session.userId || req.session.email)){

    req.loginStatus = 1;
    req.name = req.session.name
    req.email = req.session.email

  } else{
    req.loginStatus = 0;
  }
  next();

}
