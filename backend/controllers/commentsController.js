const User = require('../models/User');
const Comment = require('../models/Comment');
const dayjs = require('dayjs')
dayjs().format();

exports.addComment = [
  (req, res, next) => {
    const { description, id, postId } = req.body;

    User.findOne({_id: id}).exec((err, result) => {
      if(err){
        return next(err);
      }

      if(result){
        const formattedDate = dayjs(new Date()).format('YYYY-MM-DD');

        const comment = new Comment({
          firstName: result.firstName,
          lastName: result.lastName,
          date: formattedDate,
          description,
          author: id,
          postId
        }).save((err) => {
          if(err){
            return next(err);
          }

          return res.redirect('http://localhost:3000/home')
        })
      }
    })
  }
]

exports.deleteComment = [
  (req, res, next) => {
    const { id } = req.params;

    Comment.deleteOne({_id: id}).exec((err, result) => {
      if(err){
        return next(err);
      }

      return res.json({
        result
      })
    })
  }
]