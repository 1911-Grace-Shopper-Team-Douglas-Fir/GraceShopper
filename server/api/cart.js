const router = require('express').Router()
const {CartItems, Product} = require('../db/models')

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
    const entryId = req.body.id
    const updateObj = {
      ...(req.body.quantity && {quantity: req.body.quantity}),
      ...(req.body.productId && {productId: req.body.productId}),
      ...(req.body.userId && {userId: req.body.userId})
    }
    await CartItems.findByPk(entryId)
    await cartItem.update(updateObj)
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
//     await CartItems.create({
//       quantity: req.body.quantity,
//       productId: req.body.productId,
//       userId: req.body.userId,
//       orderId: null
//     })
//     const cart = await CartItems.findAll({
//       where: {
//         userId: req.params.userId,
//         orderId: null
//       },
//       include: [
//         {
//           model: Product
//         }
//       ],
//       order: [['id', 'ASC']]
//     })
//     res.json(cart)
//   } catch (err) {
//     next(err)
//   }
// })

router.post('/', async (req, res, next) => {
  try {
    let item = await CartItems.findOne({
      where: {
        ...(req.body.userId && {userId: req.body.userId}),
        ...(req.body.sessionId && {sessionId: req.body.sessionId}),
        productId: req.body.productId
      }
    })
    if (item) {
      item.quantity += req.body.quantity
      await item.save()
    } else {
      await CartItems.create({
        quantity: req.body.quantity,
        productId: req.body.productId,
        ...(req.body.userId && {userId: req.body.userId}),
        ...(req.body.sessionId && {sessionId: req.body.sessionId}),
        orderId: null
      })
    }
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
