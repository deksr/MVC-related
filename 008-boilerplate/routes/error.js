var express = require('express')
var router = express.Router()

router.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
router.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json(err)
})

module.exports = router