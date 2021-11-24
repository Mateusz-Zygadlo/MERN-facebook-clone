const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const dayjs = require('dayjs')
dayjs().format();


exports.newPost = [
  (req, res, next) => {
    const { id } = req.params;
    const { description } = req.body;
    
    User.findOne({_id: id}).exec((err, result) => {
      if(err){
        return next(err);
      }

      if(result){
        const formattedDate = dayjs(new Date()).format('YYYY-MM-DD');

        const post = new Post({
          firstName: result.firstName,
          lastName: result.lastName,
          date: formattedDate,
          description,
          author: id,
          likes: []
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

exports.friendPosts = (req, res, next) => {
  const { id } = req.params;

  User.findOne({_id: id}).exec((err, result) => {
    if(err){
      return next(err);
    }

    Post.find({author: result.friends}).exec((err, result) => {
      if(err){
        return next(err);
      }

      return res.json({
        result
      })
    })
  })
}

exports.ownerPosts = (req, res, next) => {
  const { id } = req.params;

  Post.find({author: id}).exec((err, result) => {
    if(err){
      return next(err);
    }

    return res.json({
      result
    })
  })
}

exports.like = [
  (req, res, next) => {
    const postId = req.params.id;
    const user = req.body.id;

    Post.findOne({_id: postId, likes: user}).exec((err, result) => {
      if(err){
        return next(err);
      }

      if(result){
        Post.updateOne({_id: postId}, { $pull: { likes: user}}).exec((err, result) => {
          if(err){
            return next(err);
          }

          return res.json({
            result
          })
        })
      }else{
        Post.updateOne({_id: postId}, { $push: { likes: user}}).exec((err, result) => {
          if(err){
            return next(err);
          }
  
          return res.json({
            result
          })
        })
      }
    })
  }
]

exports.postComments = (req, res, next) => {
  const { id } = req.params;

  Comment.find({postId: id}).exec((err, result) => {
    if(err){
      return next(err);
    }

    return res.json({
      result
    })
  })
}

exports.deletePost = [
  (req, res, next) => {
    const { id } = req.params;

    Post.deleteOne({_id: id}).exec((err, result) => {
      if(err){
        return next(err);
      }

      return res.json({
        result
      })
    })
  }
]