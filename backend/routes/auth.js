const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');

const isRefreshToken = (req, res, next) => {
  if(req.cookies['JWT-REFRESH-TOKEN']){
    return res.redirect('/');
  }

  return next();
}

router.get('/facebook', isRefreshToken, passport.authenticate('facebook'));
router.get('/facebook/callback', isRefreshToken, passport.authenticate('facebook', {
  successRedirect : '/auth/token',
  failureRedirect : '/failed'
}))

router.get('/token', isRefreshToken, userController.facebookToken);
router.get('/refreshToken', isRefreshToken, userController.refreshToken);
router.post('/register/standard', isRefreshToken, userController.newUser);
router.post('/login/standard', isRefreshToken, userController.loginUser);

module.exports = router;