const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.json({
    title: 'success [index page]',
  })
})

module.exports = router;