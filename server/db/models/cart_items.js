const Sequelize = require('sequelize')
const db = require('../db')

// REVIEW: should also have a price column
// to be populated WHEN the order is placed
const CartItems = db.define('cart_items', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sessionId: {
    type: Sequelize.STRING
  }
})

module.exports = CartItems
