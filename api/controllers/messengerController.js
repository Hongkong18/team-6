var Conversation = require('../models/conversation');
var Message = require('../models/message');
var User = require('../models/user');
var mongoose = require('mongoose');

exports.get_conversation_list = function(req, res, next){
//One message as preview
  Conversation.find({'participants': req.session.userId})
    .select('_id')
    .exec(function(err, conversations){
      if(err){
        return res.send(err);

      }
      console.log(conversations)
      console.log(req.session.userId)
      if(conversations.length == 0){
        return res.send("No conversation!")
      }
      //to keep most recent messages -> limit(1) -> populate to author (= user that sent the message)
      let fullConversations = [];

      conversations.forEach(function(conversation){
        Message.find({'conversationId': conversation._id})
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: "author",
            select: "name"
          })
          .exec(function(err, message){
            if(err){
              console.log("error")
              console.log(err)
              return res.send(err)

            }

            fullConversations.push(message);
            if(fullConversations.length === conversations.length){
              res.status(200)
              console.log("full conversations:")
              console.log(fullConversations)
              return res.send(fullConversations)
            }
          })
      })
  })
}

//get all messages in a single conversation
exports.get_conversation = function(req,res,next){
  Message.find({conversationId: req.params.conversationId})
    .select('createdAt body author')
    .sort('-createdAt')
    .populate({
      path: 'author',
      select: 'name'
    })
    .exec(function(err, messages){
      if(err){

        return res.send(err)

      }
      console.log("passed")
      return res.status(200).send(messages)

    })
}





exports.new_conversation = function(req,res,next){
  if(!req.params.recipient){
    res.status(422)
    return res.send("Please choose a valid recipient for your message")
  }

  if(!req.body.composedMessage){
    res.status(422)
    return res.send("Please enter a message")
  }



  Conversation.find({participants: [req.session.userId, req.params.recipient]}, function(err,found){
    if(found.length != 0){
      conversationId = found[0]._id

      message = new Message({
        conversationId: found[0]._id,
        body: req.body.composedMessage,
        author: req.session.userId
      })

      message.save(function(err, newMessage){
        if(err){
          return res.send(err)
        }

        res.status(200)
        return res.json({message: 'Message added to existing conversation!', conversationId: found[0]._id})
      })

    } else{
      conversation = new Conversation({
        participants: [req.session.userId, req.params.recipient]
      })

      conversation.save(function(err, newConversation){
        if(err){
            return res.send(err)
        }

        message = new Message({
          conversationId: newConversation._id,
          body: req.body.composedMessage,
          author: req.session.userId
        })
        message.save(function(err, newMessage){
          if(err){
            return res.send(err)
          }

          res.status(200)
          return res.json({message: 'Conversation started!', conversationId: conversation._id})
        })
    })
  }})

}

exports.send_reply = function(req,res,next){
  reply = new Message({
    conversationId: req.params.conversationId,
    body: req.body.composedMessage,
    author: req.session.userId
  });
  Conversation.findById(req.params.conversationId, function(err){
    if(err){

      return res.send("Conversation does not exist")
    }

    reply.save(function(err,sentReply){
      if(err){
        return res.send(err)
      }
      res.status(200)
      return res.send("Reply successfully sent")
    })


  })

}
