var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signupPage',function(req,res,next){
  
  res.render('signUpPage');

});

router.post('/signupPost', function(req,res,next){

    res.render('signInPage');
    
});





module.exports = router;
