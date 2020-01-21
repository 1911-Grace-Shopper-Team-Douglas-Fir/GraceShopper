const router = require('express').Router()
const stripe = require('stripe')('sk_test_y2fFUtFMJKXTpcsczEDElj6M00mpGP5s9D')

router.post('/', async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge',
      source: req.body.id
    })

    res.json({status})
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
})
module.exports = router
