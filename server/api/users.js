const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

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

router.put('/:userId', /* isAdmin, */async (req, res, next) => {
  try {
    const userId = req.params.userId
    const user = await User.findByPk(userId)
    // 🚨DANGER
    // user.createdAt
    await user.update(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
