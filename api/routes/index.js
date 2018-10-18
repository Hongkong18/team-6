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


router.get('/signin', function(req,res,next){
res.render('signInPage');
});




router.get('/signup', function(req,res,next){

    res.render('signInPage');

});





module.exports = router;
