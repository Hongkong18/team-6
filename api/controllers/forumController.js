var Forum = require('../models/forum');
var Comment = require('../models/comment');
var User = require('../models/user');
var mongoose = require('mongoose');


exports.get_forum_list = function(req, res, next){
//One message as preview
  Forum.find({'title': req.query.q})
    .exec(function(err, forums){
      if(err){
        return res.send(err);

      }

      if(forums.length == 0){
        return res.send("No forum!")
      } else {
        console.log(forums)
        return res.send(forums)
      }

  })
}

exports.new_forum = function(req,res,next){
  if(!req.body.title){
    return res.send("Please enter title")
  }
  if(!req.body.content){
    return res.send("Please enter content")
  }

  forum = new Forum({
    title : req.body.title,
    body : req.body.content,
    author: req.session.userId
  })
  forum.save((err, newForum)=>{
    if(err){
      return res.send(err)
    }
    res.status(200)
    return res.send("Forum added!")
  })
}
