const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const CartItems = require('./cart_items')
const Review = require('./review')

Product.hasMany(CartItems)
Product.hasMany(Review)
User.hasMany(CartItems)
User.hasMany(Review)
CartItems.belongsTo(User)
CartItems.belongsTo(Product)
CartItems.belongsTo(Order)
Order.hasMany(CartItems)

Order.belongsTo(User)

module.exports = {
  User,
  Product,
  Order,
  CartItems,
  Review
}
