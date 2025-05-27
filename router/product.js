const router = require('express').Router();
const Controller = require('../controller/product');

router.get('/dashboard',  Controller.dashboard);
router.get('/list',  Controller.index);
router.get('/expired',  Controller.expired);
router.post('/add',  Controller.add);
router.post('/update',  Controller.update);
router.put('/delete',  Controller.delete);
module.exports = router;