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
      ]
    })
    res.json(cart)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
