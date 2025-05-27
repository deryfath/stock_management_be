const router = require('express').Router();
const Controller = require('../controller/checkout');

router.post('/add',  Controller.add);
router.get('/list',  Controller.list);
router.put('/submit',  Controller.submit);
module.exports = router;