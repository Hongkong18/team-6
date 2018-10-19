var express = require('express');
var router = express.Router();

var messenger_controller = require('../controllers/messengerController')

var mid = require('../middlewares/index');

router.get('/', mid.requiresLogin, messenger_controller.get_conversation_list )

router.get('/:conversationId',mid.requiresLogin, messenger_controller.get_conversation)

router.post('/:conversationId', mid.requiresLogin, messenger_controller.send_reply)

router.post('/new/:recipient',mid.requiresLogin, messenger_controller.new_conversation)


module.exports = router;
