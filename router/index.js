const router = require('express').Router();
const productRoutes = require('./product');
const userRoutes = require('./user');
const orderRoutes = require('./order');
const warehouseRoutes = require('./warehouse');
const shopRoutes = require('./shop');

router.use('/product', productRoutes);
router.use('/user', userRoutes);
router.use('/order', orderRoutes);
router.use('/warehouse', warehouseRoutes);
router.use('/shop', shopRoutes);

module.exports = router;


