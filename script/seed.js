'use strict'

const db = require('../server/db')
const {User, Product, CartItems, Order} = require('../server/db/models')

const cartItemsToSeed = [
  {
    userId: 1,
    productId: 1,
    quantity: 2
  },
  {
    userId: 1,
    productId: 2,
    quantity: 1
  },
  {
    userId: 1,
    productId: 4,
    quantity: 2
  },
  {
    userId: 1,
    productId: 1,
    quantity: 2,
    orderId: 1
  }
]

const ordersToSeed = [
  {userId: 1, status: 'complete'},
  {userId: 2, status: 'in process'}
]

const usersToSeed = [
  {email: 'cody@email.com', password: '123'},
  {email: 'murphy@email.com', password: '123'}
]

const productsToSeed = [
  {
    name: 'Bruise salve',
    description:
      'Soothe your woes after drunken bar fights with organic arnica and shea butter',
    price: 1499,
    category: 'body',
    imageUrl: 'https://i.ibb.co/cDhkhqz/salve.jpg'
  },
  {
    name: 'Scented Candle',
    description: 'Calming scents of burning wood chips and neroli',
    price: 5399,
    category: 'home',
    imageUrl: 'https://i.ibb.co/rx60NNk/candle.jpg'
  },
  {
    name: 'Shower Gel',
    description: 'Lavender scented gel with aloe base',
    price: 899,
    category: 'body',
    imageUrl: 'https://i.ibb.co/Tvwthkk/lotion.jpg'
  },
  {
    name: 'Eye Cream',
    description: 'Roll back the years with pig placenta',
    price: 4499,
    category: 'face',
    imageUrl: 'https://i.ibb.co/DtSq6bt/eye-cream.jpg'
  },
  {
    name: 'Hand Cream',
    description: 'Rich hand cream with eucalyptus extract',
    price: 1499,
    category: 'body',
    imageUrl: 'https://i.ibb.co/Tt28Xxm/hand-cream.png'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all(usersToSeed.map(user => User.create(user)))
  const products = await Promise.all(
    productsToSeed.map(product => Product.create(product))
  )
  const orders = await Promise.all(
    ordersToSeed.map(order => Order.create(order))
  )
  const cartItems = await Promise.all(
    cartItemsToSeed.map(items => CartItems.create(items))
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
