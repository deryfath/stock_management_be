const router = require('express').Router();
const Controller = require('../controller/order');

router.post('/add',  Controller.add);
router.get('/list',  Controller.list);
router.put('/submit',  Controller.submit);
module.exports = router;