const router = require('express').Router();
const productRoutes = require('./product');
const userRoutes = require('./user');
const checkoutRoutes = require('./checkout');

router.use('/product', productRoutes);
router.use('/user', userRoutes);
router.use('/checkout', checkoutRoutes);

module.exports = router;


