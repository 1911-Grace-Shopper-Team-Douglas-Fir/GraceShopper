const router = require('express').Router()
module.exports = router

// Users router
router.use('/users', require('./users'))
router.use('/products', require('./products'))

// // All Products router
router.use('/products', require('./allProducts'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
