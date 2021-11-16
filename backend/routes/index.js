const express = require('express');
const router = express.Router();

const isRefreshToken = (req, res, next) => {
  if(req.cookies['JWT-REFRESH-TOKEN']){
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
  res.clearCookie('JWT-REFRESH-TOKEN', {path: '/'})
  req.logout();
  res.redirect('/');
})

module.exports = router;