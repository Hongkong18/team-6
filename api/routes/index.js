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




router.get('/signup', function(req,res,next){

    res.render('signInPage');

});

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


router.post('/login', login_controller.login_attempt)








module.exports = router;
