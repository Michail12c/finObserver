import userService from "../services/userService";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";  
import ErrorHandler from "../handlers/errorHandler";
import userSchema from "../models/user-schema";
import { UserDto } from "../dtos/user-dto";
import tokenService from "../services/tokenService";

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req); 
            if(!errors.isEmpty()) {
                return next(ErrorHandler.BadRequest("Error validation", errors.array())); 
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password); 
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true, 
            }); 
            return res.json(userData); 
        } catch (error) {
            next(error); 
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body; 
            const userData = await userService.login(email, password); 
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true, 
            }); 
            return res.json(userData); 
        } catch (error) {
            next(error); 
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies; 
            const token = await userService.logout(refreshToken); 
            res.clearCookie('refreshToken'); 
            return res.json(200); 
        } catch (error) {
            next(error); 
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link; 
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            next(error); 
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies; 
            const userData = await userService.refresh(refreshToken); 
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true, 
            }); 
            return res.json(userData);
        } catch (error) {
            next(error); 
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers(); 
            return res.json(users); 
        } catch (error) {
            next(error); 
        }
    }
}

export default new UserController();