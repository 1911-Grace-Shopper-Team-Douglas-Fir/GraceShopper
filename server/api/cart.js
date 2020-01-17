const router = require('express').Router()
const {CartItems, Product} = require('../db/models')
const Sequelize = require('sequelize')

router.get('/mine', async (req, res, next) => {
  if (req.user) {
    // query data with { where: { userId: req.user.id } }
  }
  else {
    // query data by session
  }
})



// util/gateway.js
function requireAdmin (req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  else {
    res.sendStatus(404);
  }
}
function requireUser (req, res, next) {
  if (req.user) {
    next();
  else {
    res.sendStatus(404);
  }
}

router.get('/:userId', requireAdmin, async (req, res, next) => {
    try {
      const cart = await CartItems.findAll({
        where: {
          //...(req.body.userId && {userId: req.body.userId}),
          //...(req.body.sessionId && {sessionId: req.body.sessionId}),
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
  }


})

// npm install lodash
// lodash.pick
const pick = require('lodash').pick

const SELF_UPDATABLE_USER_PARAMS = ['quantity', 'productId', 'userId']
const ADMIN_UPDATABLE_USER_PARAMS [...SELF_UPDATABLE_USER_PARAMS, 'email', 'isAdmin']

router.put('/:userId', async (req, res, next) => {
  try {
    const entryId = req.body.id
    const updateObj = {
      ...(req.body.quantity && {quantity: req.body.quantity}),
      ...(req.body.productId && {productId: req.body.productId}),
      ...(req.body.userId && {userId: req.body.userId})
    }

    const updateObj = pick(req.body, req.user.isAdmin ? ADMIN_UPDATABLE_USER_PARAMS : UPDATABLE_USER_PARAMS)

    await CartItems.findByPk(entryId)
    await cartItem.update(updateObj)
    // const [updatedRecords, 1] = CartItems.update({ where: { id: entryId }}, updateObj)
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
  // user or session?
  try {
    await CartItems.destroy({where: {productId: productId}})
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
