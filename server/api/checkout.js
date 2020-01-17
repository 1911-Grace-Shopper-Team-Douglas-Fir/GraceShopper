const router = require('express').Router()
const stripe = require('stripe')('sk_test_y2fFUtFMJKXTpcsczEDElj6M00mpGP5s9D')

// router.get('/', (req, res) => {
//   res.send("Add your Stripe Secret Key to the .require('stripe') statement!")
// })

// router.post('/', async (req, res) => {
//   console.log('Request:', req.body)

//   try {
//     console.log(req.body)
//     const {product, token} = req.body

//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id
//     })

//     const charge = await stripe.charges.create(
//       {
//         amount: product.price * 100,
//         currency: 'usd',
//         customer: customer.id,
//         receipt_email: token.email,
//         description: 'FILL IN LATER'
//       },
//       {}
//     )
//     console.log('Charge:', {charge})
//   } catch (error) {
//     console.log(error)
//   }
// })

router.post('/', async (req, res) => {
  console.log('request', req.body)
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
