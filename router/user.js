const router = require('express').Router();
const Controller = require('../controller/user');

router.get('/list',  Controller.list);
router.get('/:id',  Controller.findById);
router.post('/update',  Controller.update);
router.post('/remove',  Controller.remove);
router.post('/register',  Controller.register);
router.post('/login',  Controller.login);
router.put('/logout',  Controller.logout);

module.exports = router;