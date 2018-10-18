var mongoose = require('mongoose');
var Schema = mongoose.Schema;


forumSchema = new Schema({
  comments: [{type: Schema.Types.ObjectId, ref: 'User'}],
  title:{
    type: String,
    required: true
  },
  body: {
    type:String,
    required:true
  }
});

var Forum = mongoose.model('Forum', forumSchema);


module.exports = Forum;
