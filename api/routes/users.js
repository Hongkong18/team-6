var express = require('express');
var router = express.Router();

var messenger_controller = require('../controllers/messengerController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
