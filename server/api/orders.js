const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  const userId = req.params.userId
  try {
    const order = await Order.findOne({
      where: {
        userId: userId
      },
      order: [['createdAt', 'DESC']]
    })
    console.log('in route', order)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const userId = Number(Object.keys(req.body))
  try {
    const newOrder = await Order.create({
      status: 'in process',
      userId
    })
    res.send(newOrder)
  } catch (err) {
    next(err)
  }
})
