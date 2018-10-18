var express = require('express');
var router = express.Router();
var login_controller = require('../controllers/loginController');
var user_controller = require('../controllers/userController');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', user_controller.user_sign_up)
router.get('/signupPage',function(req,res,next){

  res.render('signUpPage');

});

router.post('/signupPost', function(req,res,next){

    res.render('signInPage');
    
});





module.exports = router;
