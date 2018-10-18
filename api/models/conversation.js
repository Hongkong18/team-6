var mongoose = require('mongoose');
var Schema = mongoose.Schema;


conversationSchema = new Schema({

  participants: [{type: String, ref: 'User'}],
});

var Conversation = mongoose.model('Conversation', conversationSchema);


module.exports = Conversation;
