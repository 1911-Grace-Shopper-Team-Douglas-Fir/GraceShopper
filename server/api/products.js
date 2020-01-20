const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({order: [['id', 'ASC']]})
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/filter/:type', async (req, res, next) => {
  try {
    let products
    if (req.params.type === 'price') {
      products = await Product.findAll({order: [['price', 'ASC']]})
    } else if (req.params.type === 'name') {
      products = await Product.findAll({order: [['name', 'ASC']]})
    } else {
      products = await Product.findAll({
        where: {
          category: req.params.type
        },
        order: [['id', 'ASC']]
      })
    }
    res.json(products)
  } catch (error) {
    next(error)
  }
})

module.exports = router
