require('dotenv').config();

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.newUser = [
  async (req, res, next) => {
    const {password, firstName, lastName} = req.body;
    let {email} = req.body;
    email = email.toLowerCase();
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({email: email});

    if(user != null){
      return res.redirect('http://localhost:3000/', )
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
      .redirect('http://localhost:3000/')
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