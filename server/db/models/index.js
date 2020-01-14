const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const CartItems = require('./cart_items')

Product.hasMany(CartItems)
User.hasMany(CartItems)
CartItems.belongsTo(User)
CartItems.belongsTo(Product)
CartItems.belongsTo(Order)
Order.hasMany(CartItems)

Order.belongsTo(User)

module.exports = {
  User,
  Product,
  Order,
  CartItems
}
