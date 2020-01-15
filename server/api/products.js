const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/product/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

module.exports = router
