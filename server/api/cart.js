const router = require('express').Router()
const {CartItems, Product} = require('../db/models')
const Sequelize = require('sequelize')

router.get('/:id', async (req, res, next) => {
  let id = /[a-z]/i.test(req.params.id)
    ? {sessionId: req.params.id, orderId: null}
    : {userId: req.params.id, orderId: null}
  try {
    const cart = await CartItems.findAll({
      where: id,
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
    let updateObj = /[a-z]/i.test(req.params.id)
      ? {
          sessionId: req.params.userId,
          quantity: req.body.quantity,
          ...(req.body.productId && {productId: req.body.productId})
        }
      : {
          userId: req.params.userId,
          quantity: req.body.quantity,
          ...(req.body.productId && {productId: req.body.productId})
        }

    const cartItem = await CartItems.findByPk(entryId)
    await cartItem.update(updateObj)

    let id = /[a-z]/i.test(req.params.id)
      ? {sessionId: req.params.id, orderId: null}
      : {userId: req.params.id, orderId: null}

    const cart = await CartItems.findAll({
      where: id,
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
  const update = req.body.userId
    ? {userId: req.body.userId, productId: req.body.productId}
    : {sessionId: req.body.sessionId, productId: req.body.productId}
  const createNew = req.body.userId
    ? {
        userId: req.body.userId,
        productId: req.body.productId,
        quantity: req.body.quantity,
        price: req.body.price
      }
    : {
        sessionId: req.body.sessionId,
        productId: req.body.productId,
        quantity: req.body.quantity,
        price: req.body.price
      }
  try {
    let item = await CartItems.findOne({
      where: update
    })
    if (item) {
      item.quantity += req.body.quantity
      await item.save()
    } else {
      await CartItems.create(createNew)
    }

    const id = req.body.userId
      ? {userId: req.body.userId, orderId: null}
      : {sessionId: req.body.sessionId, orderId: null}

    const cart = await CartItems.findAll({
      where: id,
      include: [
        {
          model: Product
        }
      ],
      order: [['id', 'ASC']]
    })
    res.json(cart)
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
