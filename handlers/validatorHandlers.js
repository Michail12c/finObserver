import { body } from "express-validator"; 

class ValidatorHandler {
    login = [body('email').isEmail(), body('password').isLength({min: 6, max: 32 })];
}

export default new ValidatorHandler(); 