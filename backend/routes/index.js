const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentsController = require('../controllers/commentsController');

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

router.post('/findFriends', userController.findFriends);
router.post('/friends', userController.friends);
router.post('/invitations', userController.invitations);
router.get('/profile/:id', userController.profile);
router.post('/addInvitation/:id', userController.addInvitation);
router.post('/cancelInvitation/:id', userController.cancelInvitation);
router.post('/acceptInvitation/:id', userController.acceptInvitation);
router.post('/deleteFriend/:id', userController.deleteFriend);
router.post('/deleteInvitation/:id', userController.deleteInvitation);
router.get('/friendRequests/:id', userController.friendRequests);
router.post('/newPost/:id', postController.newPost);
router.get('/friendsPosts/:id', postController.friendPosts);
router.get('/ownerPosts/:id', postController.ownerPosts);
router.post('/like/:id', postController.like);
router.post('/addComment', commentsController.addComment);
router.get('/postComments/:id', postController.postComments);
router.post('/deleteComment/:id', commentsController.deleteComment);
router.post('/deletePost/:id', postController.deletePost);

module.exports = router;