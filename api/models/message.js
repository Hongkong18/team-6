var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  conversationId: {
//email address as gcloud entity key
    type: Schema.Types.ObjectId,
    required: true
  },
  body: {
    type:String,
    required:true
  },
  author:{
    //email address as gcloud entity key
    type: Schema.Types.ObjectId,
    ref:'User'
  }
},
{
  timestamps: true
});


var Message = mongoose.model('Message', messageSchema);
module.exports = Message;
