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

exports.get_forum_comments = function(req,res,next){
  Comment.find({forumId: req.params.forumId})
    .select('createdAt content author')
    .sort('-createdAt')
    .populate({
      path: 'author',
      select: 'name'
    })
    .exec(function(err, comments){
      if(err){
        return res.send(err)
      }
      res.status(200)
      res.send(comments)
    })

}
exports.get_forum = function(req, res, next){
  Forum.findById(req.params.forumId).exec((err, forums)=>{
    if(err){
      return res.send(err)
    }
    res.status(200)
    return res.send(forums)

  })

}

exports.post_forum_comments = function(req,res, next){
  comment = new Comment({
    forumId:req.params.forumId,
    body:req.body.body,
    author: req.session.userId
  });
  Forum.findById(req.params.forumId, function(err){
    if(err){
      return res.send("forum does not exist")
    }
    comment.save(function(err, sentComment){
      if(err){
        return res.send(err)
      }
      res.status(200)
      return res.send("Comment uploaded successfully")
    })
  })

}
