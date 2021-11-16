const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/userController');

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect : '/auth/token',
  failureRedirect : '/failed'
}))

router.get('/token', userController.facebookToken);
router.get('/refreshToken', userController.refreshToken);
router.post('/register/standard', userController.newUser);
router.post('/login/standard', userController.loginUser);

module.exports = router;