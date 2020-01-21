const router = require('express').Router()
const {User, Order, CartItems, Product} = require('../db/models')
module.exports = router
const sequelize = require('sequelize')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//****** Need to include 'isLoggedIn' conditional here before this route:
router.get('/myprofile', async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {
        userId: req.user.id
      },
      include: [
        {
          model: CartItems,
          where: {
            orderId: {
              [sequelize.Op.ne]: null
            }
          },
          include: [
            {
              model: Product
            }
          ]
        }
      ]
    })
    res.json(userOrders)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const user = await User.findByPk(userId)
    await user.update(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
