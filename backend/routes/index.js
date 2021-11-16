const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  return res.json({
    title: 'you are valid user',
  })
})

router.get('/failed', (req, res) => {
  return res.json({
    title: 'you are not valid user',
  })
})

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;