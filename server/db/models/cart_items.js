const Sequelize = require('sequelize')
const db = require('../db')

const CartItems = db.define('cart_items', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sessionId: {
    type: Sequelize.STRING
  }
})

module.exports = CartItems
