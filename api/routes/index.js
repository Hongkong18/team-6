var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/displayMap', function(req, res, next){
    req.db.getCollection('trends').find({}, function(err, records){
        if(err){
            res.send({msg: err});
            return;
        }
        res.send(records);
        return;
    })
});

req.db.getCollection('searchLog').update({})

req.db.find()

module.exports = router;
