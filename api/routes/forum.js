var express = require('express');
var router = express.Router();

var forum_controller = require('../controllers/forumController')

var mid = require('../middlewares/index');



router.get('/', forum_controller.get_forum_list)

router.post('/new', forum_controller.new_forum)

router.get('/:forumId', forum_controller.get_forum)




module.exports = router;
