require('dotenv').config();

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const async = require('async');

exports.newUser = [
  async (req, res, next) => {
    const {password, firstName, lastName} = req.body;
    let {email} = req.body;
    email = email.toLowerCase();
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({email: email});

    if(user != null){
      return res.redirect('http://localhost:3000/failedRegister', )
    }

    const newUser = new User({
      email,
      password: hashedPassword,
      picture: '',
      firstName,
      lastName,
      loginWithFacebook: false,
      friends: [],
      yourInvitations: [],
      invitations: [],
    }).save((err) => {
      if(err){
        return next(err);
      }
    })

    return res
      .redirect('http://localhost:3000/successRegister')
  }
]

exports.loginUser = [
  async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});

    if(user == null){
      return res.redirect('http://localhost:3000/failedLogin')
    }
    try{
      if(await bcrypt.compare(password, user.password)){ 
        const userObj = {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user._id,
          friends: user.friends,
          yourInvitations: user.yourInvitations,
          invitations: user.invitations,
        }
        const accessToken = jwt.sign(userObj, process.env.SECRET_KEY);

        return res
          .status(202)
          .cookie('JWT-TOKEN', accessToken, {
            sameSite: 'strict', 
            path: '/', 
            expires: new Date(new Date().getTime() + 1000000 * 1000),
            secure: true,
          })
          .redirect('http://localhost:3000/home')
      }else{
        return res.redirect('http://localhost:3000/failedLogin')
      }
    }catch(err){
      console.log(err);
    }
  }
]

exports.facebookToken = async (req, res, next) => {
  if(localStorage.getItem('id')){
    const user = await User.findOne({facebookId: localStorage.getItem('id')});

    if(user == null){
      return res.redirect('http://localhost:3000/failedLogin')
    }

    const userObj = {
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
      friends: user.friends,
      yourInvitations: user.yourInvitations,
      invitations: user.invitations,
    }

    const accessToken = jwt.sign(userObj, process.env.SECRET_KEY);
    localStorage.removeItem('id');

    return res
      .cookie('JWT-TOKEN', accessToken, {
        sameSite: 'strict', 
        path: '/', 
        expires: new Date(new Date().getTime() + 30 * 1000),
        secure: true,
      })
      .redirect('http://localhost:3000/home')
  }
    
  return res.redirect('http://localhost:3000/failedLogin')
}

exports.findFriends = [
  (req, res, next) => {
    const { id } = req.body;

    User.find({ _id: { $ne: id, }, friends: { $ne: id, }}).exec((err, result) => {
      if(err){
        return next(err);
      }

      return res.json({
        result,
      })
    })
  }
]

exports.profile = (req, res, next) => {
  const { id } = req.params;

  User.findOne({_id: id}).exec((err, result) => {
    if(err){
      return next(err);
    }

    return res.json({
      result
    })
  })
}

exports.addInvitation = [
  (req, res, next) => {
    const { id } = req.params;
    const userId = req.body.id;

    async.parallel({
      owner: (callback) => {
        User.updateOne({_id: userId}, { $push: { yourInvitations: id }}).exec(callback);
      },
      user: (callback) => {
        User.updateOne({_id: id}, { $push: { invitations: userId }}).exec(callback);
      }
    }, (err, result) => {
      if(err){
        return next(err);
      }

      return res.json({
        result
      })
    })
  }
]

exports.cancelInvitation = [
  (req, res, next) => {
    const { id } = req.params;
    const userId = req.body.id;

    async.parallel({
      owner: (callback) => {
        User.updateOne({_id: userId}, { $pull: { yourInvitations: id }}).exec(callback);
      }, 
      user: (callback) => {
        User.updateOne({_id: id}, { $pull: { invitations: userId }}).exec(callback);
      }
    }, (err, result) => {
      if(err){
        return next(err);
      }

      return res.json({
        result
      })
    })
  }
]

exports.acceptInvitation = [
  (req, res, next) => {
    const { id } = req.params;
    const userId = req.body.id;

    async.parallel({
      deleteOwnerInvitation: (callback) => {
        User.updateOne({_id: id}, { $pull: { yourInvitations: userId }}).exec(callback);
      }, 
      deleteUserInvitation: (callback) => {
        User.updateOne({_id: userId}, { $pull: { invitations: id }}).exec(callback);
      }, 
      AddUserToFriends: (callback) => {
        User.updateOne({_id: id}, { $push: { friends: userId }}).exec(callback);
      }, 
      AddOwnerToFriends: (callback) => {
        User.updateOne({_id: userId}, { $push: { friends: id }}).exec(callback);
      }
    }, (err, result) => {
      if(err){
        return next(err);
      }

      return res.json({
        result
      })
    })
  }
]

exports.deleteInvitation = [
  (req, res, next) => {
    const { id } = req.params;
    const userId = req.body.id;

    async.parallel({
      deleteOwnerInvitation: (callback) => {
        User.updateOne({_id: id}, { $pull: { yourInvitations: userId }}).exec(callback);
      }, 
      deleteUserInvitation: (callback) => {
        User.updateOne({_id: userId}, { $pull: { invitations: id }}).exec(callback);
      }, 
    }, (err, result) => {
      if(err){
        return next(err);
      }

      return res.json({
        result
      })
    })
  }
]

exports.deleteFriend = [
  (req, res, next) => {
    const { id } = req.params;
    const userId = req.body.id;

    async.parallel({
      owner: (callback) => {
        User.updateOne({_id: userId}, { $pull: { friends: id }}).exec(callback);
      },
      user: (callback) => {
        User.updateOne({_id: id}, { $pull: { friends: userId }}).exec(callback);
      }
    }, (err, result) => {
      if(err){
        return next(err);
      }

      return res.json({
        result
      })
    })
  }
]

exports.friendRequests = (req, res, next) => {
  const { id } = req.params;

  User.find({yourInvitations: id}).exec((err, result) => {
    if(err){
      return next(err);
    }

    return res.json({
      result
    })
  })
}

exports.friends = [
  (req, res, next) => {
    const { id } = req.body;

    User.find({friends: id}).exec((err, result) => {
      if(err){
        return next(err);
      }

      return res.json({
        result
      })
    })
  }
]

exports.invitations = [
  (req, res, next) => {
    const { id } = req.body;

    User.find({yourInvitations: id}).exec((err, result) => {
      if(err){
        return next(err);
      }

      return res.json({
        result
      })
    })
  }
]