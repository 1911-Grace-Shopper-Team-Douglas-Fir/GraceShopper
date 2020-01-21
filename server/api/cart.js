const router = require('express').Router()
const {CartItems, Product} = require('../db/models')
const Sequelize = require('sequelize')

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await CartItems.findAll({
      where: {
        ...(req.body.userId && {userId: req.body.userId}),
        ...(req.body.sessionId && {sessionId: req.body.sessionId}),
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
    console.log('REQ.BODY', req.body)
    const entryId = req.body.id
    const updateObj = {
      ...(req.body.quantity && {quantity: req.body.quantity}),
      ...(req.body.productId && {productId: req.body.productId}),
      ...(req.body.userId && {userId: req.body.userId})
    }
    await CartItems.findByPk(entryId)
    await CartItems.update(updateObj)
    const cart = await CartItems.findAll({
      where: {
        ...(req.body.userId && {userId: req.body.userId}),
        ...(req.body.sessionId && {sessionId: req.body.sessionId}),
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

// router.post('/', async (req, res, next) => {
//   try {
//     const newCartItem = await CartItems.create({
//       quantity: req.body.quantity,
//       productId: req.body.productId,
//       userId: req.body.userId,
//       orderId: null
//     })
//     res.status(200).json(newCartItem)
//   } catch (err) {
//     next(err)
//   }
// })

// Adding to cart & consolidate quantities
router.post('/', async (req, res, next) => {
  try {
    let item = await CartItems.findOne({
      where: {
        userId: req.body.userId,
        productId: req.body.productId
      }
    })
    if (item) {
      item.quantity += req.body.quantity
      await item.save()
    } else {
      let item = await CartItems.create({
        quantity: req.body.quantity,
        productId: req.body.productId,
        userId: req.body.userId,
        orderId: null
      })
    }
    res.status(200).json(item)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  const productId = req.params.productId
  try {
    await CartItems.destroy({where: {productId: productId}})
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
