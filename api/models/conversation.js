var mongoose = require('mongoose');
var Schema = mongoose.Schema;


conversationSchema = new Schema({

  participants: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

var Conversation = mongoose.model('Conversation', conversationSchema);


module.exports = Conversation;
