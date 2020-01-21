const router = require('express').Router()
const {Product, Review} = require('../db/models')

router.post('/review', async (req, res, next) => {
  const newReview = {
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    productId: req.body.productId,
    rating: req.body.rating
  }
  try {
    await Review.create(newReview)
    const product = await Product.findByPk(req.body.productId, {
      include: [
        {
          model: Review
        }
      ]
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: [
        {
          model: Review
        }
      ]
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Review
        }
      ],
      order: [['id', 'ASC']]
    })
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
