const router = require('express').Router()
const {CartItems, Product} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await CartItems.findAll({
      where: {
        userId: req.params.userId,
        orderId: null
      },
      include: [
        {
          model: Product
        }
      ],
      order: [['id', 'ASC']]
    })
    res.json(cart)
  } catch (error) {
    console.log(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const entryId = req.body.id
    const updateObj = {
      ...(req.body.quantity && {quantity: req.body.quantity}),
      ...(req.body.productId && {productId: req.body.productId}),
      ...(req.body.userId && {userId: req.body.userId})
    }
    const cartItem = await CartItems.findByPk(entryId)
    await cartItem.update(updateObj)
    const cart = await CartItems.findAll({
      where: {
        userId: req.params.userId,
        orderId: null
      },
      include: [
        {
          model: Product
        }
      ],
      order: [['id', 'ASC']]
    })
    res.json(cart)
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newCartItem = await CartItems.create({
      quantity: req.body.quantity,
      productId: req.body.productId,
      userId: req.body.userId,
      orderId: null
    })
    res.status(200).json(newCartItem)
  } catch (err) {
    next(err)
  }
})

module.exports = router
