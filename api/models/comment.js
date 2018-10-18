var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  forumId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  body: {
    type:String,
    required:true
  },
  author:{
    type: Schema.Types.ObjectId,
    ref:'User'
  }
});


var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
