const express =require('express');
const userController =require('../controller/user');
const checkAuth = require("../middleware/checkAuth");


const router =express.Router();

router.get('/',userController.getallUser);
router.post('/sign-up',userController.signUp);
router.delete('/:id',userController.removeUser);
router.post('/login',userController.logIn);
router.patch("/:id",  userController.update);
router.get("/:id", checkAuth.checkAuth, userController.getInfo);



module.exports =router;