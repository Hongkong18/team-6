var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signupPage',function(req,res,next){
  
  res.render('signUpPage');

});





module.exports = router;
