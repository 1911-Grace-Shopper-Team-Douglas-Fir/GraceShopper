const router = require('express').Router()
const User = require('../db/models/user')
const CartItems = require('../db/models/cart_items')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    const cart = await CartItems.findAll({where: {sessionId: req.session.id}})
    await Promise.all(
      cart.map(item => item.update({sessionId: null, userId: user.id}))
    )
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    const cart = await CartItems.findAll({where: {sessionId: req.session.id}})
    await Promise.all(
      cart.map(item => item.update({sessionId: null, userId: user.id}))
    )
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.get('/sid', async (req, res, next) => {
  try {
    res.send(req.session.id)
  } catch (error) {
    next(error)
  }
})

router.use('/google', require('./google'))
