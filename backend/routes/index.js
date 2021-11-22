const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const isRefreshToken = (req, res, next) => {
  if(req.cookies['JWT-TOKEN']){
    return next();
  }

  return res.redirect('/');
}

router.get('/profile', isRefreshToken, (req, res) => {
  return res.json({
    title: 'you are valid user',
  })
})

router.get('/failed', isRefreshToken, (req, res) => {
  return res.json({
    title: 'you are not valid user',
  })
})

router.get('/logout', isRefreshToken, (req, res) => {
  req.logout();

  return res
    .clearCookie('JWT-TOKEN', {path: '/'})
    .redirect('http://localhost:3000/')
})

router.get('/friends', userController.friends);
router.get('/profile/:id', userController.profile);
router.post('/addInvitation/:id', userController.addInvitation);
router.post('/cancelInvitation/:id', userController.cancelInvitation);
router.post('/acceptInvitation/:id', userController.acceptInvitation);
router.post('/deleteFriend/:id', userController.deleteFriend);
router.post('/deleteInvitation/:id', userController.deleteInvitation);

module.exports = router;