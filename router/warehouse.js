const router = require('express').Router();
const Controller = require('../controller/warehouse');

router.get('/list',  Controller.index);
router.post('/add',  Controller.add);
router.post('/update',  Controller.update);
router.put('/delete',  Controller.delete);
module.exports = router;