var express = require('express');
var router = express.Router();
var login_controller = require('../controllers/loginController');
var user_controller = require('../controllers/userController');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signUpPage', { title: 'Express' });
});

/*router.post('/signup', function(req, res, next) {
  res.render('signInPage', { title: 'Express' })
});*/


/*router.get('/signupPage',function(req,res,next){

  res.render('signUpPage');

});*/

router.get('/landing',function(req,res,next){
res.render('index');
});


router.post('/signupPost', function(req,res,next){

})


router.get('/signin', function(req,res,next){
res.render('signInPage');
});




//router.post('/signup',user_controller.user_sign_up);

router.get('/forum', function(req,res,next){
  res.render('forumPage');
});

router.get('/displayMap', function(req,res,next){
 res.render('mapPage');

});

router.get('/search', function(req,res,next){
res.render('searchEntry');
});

router.get('/searchPage', function(req,res,next){
res.render('searchPage');
});

router.get('/articlePage', function(req,res,next){

res.render('articlePage');

});

router.post('/login', login_controller.login_attempt)


router.post('/logout', function(req,res,next){
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
})





module.exports = router;
