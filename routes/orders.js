const express =require('express');
const ordersController =require('../controller/orders');
const checkAuth = require("../middleware/checkAuth");


const router =express.Router();

router.get('/',checkAuth.checkAuth, ordersController.index);
router.get('/:id',checkAuth.checkAuth,ordersController.userOrder);
router.get('/:id',ordersController.show);
router.post('/',checkAuth.checkAuth, ordersController.save);



module.exports =router;