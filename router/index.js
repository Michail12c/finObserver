import { Router } from "express";
import userController from "../controllers/userController.js";
import validatorHandlers from "../handlers/validatorHandlers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = new Router(); 

router.post('/registration', validatorHandlers.login, userController.registration); 
router.post('/login', userController.login);
router.post('/logout', userController.logout); 
router.get('/activate/:link', userController.activate); 
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers); 

export default router; 
