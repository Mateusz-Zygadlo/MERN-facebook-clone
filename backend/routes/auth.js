const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');

const FAILED_LOGIN = "http://localhost:3000/failedLogin";

const isRefreshToken = (req, res, next) => {
  if(req.cookies['JWT-TOKEN']){
    return res.redirect('/');
  }

  return next();
}

router.get('/facebook', isRefreshToken, passport.authenticate('facebook'));
router.get('/facebook/callback', isRefreshToken, passport.authenticate('facebook', {
  successRedirect : '/auth/token',
  failureRedirect : FAILED_LOGIN
}))

router.get('/token', isRefreshToken, userController.facebookToken);
router.post('/register/standard', isRefreshToken, userController.newUser);
router.post('/login/standard', isRefreshToken, userController.loginUser);

module.exports = router;