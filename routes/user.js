const express =require('express');
const userController =require('../controller/user');
const checkAuth = require("../middleware/checkAuth");


const router =express.Router();

router.post('/sign-up',userController.signUp);
router.post('/login',userController.logIn);
router.patch("/:id", checkAuth.checkAuth, userController.update);



module.exports =router;