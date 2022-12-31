const express =require('express');
const userController =require('../controller/user');

const router =express.Router();

router.post('/sign-up',userController.signUp);
router.post('/login',userController.logIn);


module.exports =router;