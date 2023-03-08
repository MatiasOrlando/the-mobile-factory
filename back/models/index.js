const Brand = require("./Brand");
const Carrito = require("./Carrito");
const Customer = require("./Customer");
const Product = require("./Product");
const Order = require("./Order");

Order.belongsTo(Customer);
Customer.hasMany(Order);

Product.belongsTo(Brand);
Brand.hasMany(Product);

Product.belongsToMany(Customer, { through: { model: Carrito, unique: false } });
Customer.belongsToMany(Product, { through: { model: Carrito, unique: false } });

module.exports = { Brand, Carrito, Customer, Product };
