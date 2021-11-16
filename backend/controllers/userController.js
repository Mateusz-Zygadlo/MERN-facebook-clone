require('dotenv').config();

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.newUser = [
  async (req, res, next) => {
    const {email, password, genderOptional, picture, firstName, lastName, pronoun, month, day, year, sex} = req.body;

    if(!email || !password){
      return res.json({
        title: 'not found email or password'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    User.find({email: email}).exec((err, result) => {
      if(err){
        return next(err);
      }
      if(result.length){
        User.find().exec((err, result) => {
          if(err){
            return next(err);
          }

          return res.json({
            err: 'Account for this email has already been created',
          })
        })
      }else{
        const user = new User({
          email,
          password: hashedPassword,
          gender: sex || genderOptional || "",
          picture,
          firstName,
          lastName,
          pronoun,
          date: `${day}-${month}-${year}` ,
          loginWithFacebook: false,
        }).save((err) => {
          if(err){
            return next(err);
          }
        })

        return res.json({
          title: 'success created account',
        })
      }
    })
  }
]

exports.loginUser = [
  async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});

    if(!user){
      return res.json({
        title: 'error',
        err: 'User not found',
      })
    }
    try{
      if(await bcrypt.compare(password, user.password)){ 
        const userObj = {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user._id,
        }
        const accessToken = jwt.sign(userObj, process.env.SECRET_KEY);

        return res
          .status(202)
          .cookie('JWT-TOKEN', accessToken, {
            sameSite: 'strict', 
            path: '/', 
            expires: new Date(new Date().getTime() + 30 * 1000),
            secure: true,
          })
          .json({
            title: 'success',
          })
      }else{
        return res.json({
          title: 'error',
          err: 'Password is incorrect',
        })
      }
    }catch(err){
      console.log(err);
    }
  }
]

exports.facebookToken = (req, res, next) => {
  if(localStorage.getItem('id')){
    User.findOne({facebookId: localStorage.getItem('id')}).exec((err, result) => {
      if(err){
        return{
          err: 'error',
        }
      }

      const userObj = {
        firstName: result.firstName,
        lastName: result.lastName,
        id: result._id,
      }

      const accessToken = jwt.sign(userObj, process.env.SECRET_KEY);

      return res
        .cookie('JWT-TOKEN', accessToken, {
          sameSite: 'strict', 
          path: '/', 
          expires: new Date(new Date().getTime() + 30 * 1000),
          secure: true,
        })
        .redirect('/profile')
    })
  }
}

exports.refreshToken = (req, res, next) => {
  let cookie = req.cookies['JWT-REFRESH-TOKEN'];

  if(!req.cookies['JWT-REFRESH-TOKEN'] && !req.cookies['JWT-TOKEN']){
    return res.json({
      error: 'Not created token'
    })
  }

  if(!cookie && req.cookies['JWT-TOKEN']){
    jwt.verify(req.cookies['JWT-TOKEN'], process.env.SECRET_KEY, (err, user) => {
      if(err){
        return res.status(403).json({
          title: 'Invalid refresh token',
        })
      }

      const userObj = {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
      }
      
      const refreshToken = jwt.sign(userObj, process.env.REFRESH_TOKEN_KEY);
  
      return res
        .cookie('JWT-REFRESH-TOKEN', refreshToken, {
          sameSite: 'strict', 
          path: '/', 
          expires: new Date(new Date().getTime() + 1000000 * 1000),
          secure: true,
        })
        .json({
          user
        })
      })
  }else{
    jwt.verify(cookie, process.env.REFRESH_TOKEN_KEY, (err, user) => {
      if(err){
        return res.status(403).json({
          title: 'Invalid refresh token',
        })
      }
  
      return res.json({
        user
      })
    })
  }
}