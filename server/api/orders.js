const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

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
