import userModel from "../models/user-schema";
import bcrypt from "bcrypt";  
import {v4 as uuid} from "uuid"; 
import mailService from "./mailService";
import tokenService from "./tokenService";
import { UserDto } from "../dtos/user-dto";
import ErrorHandler from "../handlers/errorHandler";

class UserService {
    async registration(email, password) {
        const candidate = await userModel.findOne({email}); 
        if(candidate) {
            throw ErrorHandler.BadRequest("User with this email is already exist"); 
        }
        const hashPassword = await bcrypt.hash(password, 3); 
        const activationLink = uuid(); 
        const user = await userModel.create({email, password: hashPassword, activationLink}); 
        const activationUrl = `${process.env.API_URL}/api/activate/${activationLink}`;
        await mailService.sendActivationMail(email, activationUrl); 
        const userDto = new UserDto(user);  
        const tokens = tokenService.generateToken({...userDto}); 
        await tokenService.saveToken(userDto.id, tokens.refreshToken); 
        return {
            ...tokens, 
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await userModel.findOne({activationLink}); 
        if(!user) {
            throw ErrorHandler.BadRequest("Activation link is not correct"); 
        }
        user.isActivated = true; 
        await user.save(); 
    }

    async login(email, password) {
        const user = await userModel.findOne({email}); 
        if(!user) {
            throw ErrorHandler.BadRequest("User with that email is not exist"); 
        }
        const isPassCorrect = await bcrypt.compare(password, user.password); 
        if(!isPassCorrect) {
            throw ErrorHandler.BadRequest("Email or password is not correct");
        }
        const userDto = new UserDto(user); 
        const tokens = tokenService.generateToken({ ...userDto }); 
        await tokenService.saveToken(userDto.id, tokens.refreshToken); 
        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken); 
        return token; 
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ErrorHandler.UnauthorizedError(); 
        }
        const userData = tokenService.validateRefreshToken(refreshToken); 
        const tokenFromDB = await tokenService.findToken(refreshToken); 
        if(!userData || !tokenFromDB) {
            throw ErrorHandler.UnauthorizedError(); 
        }
        const user = await userModel.findById(userData.id); 
        const userDto = new UserDto(user);  
        const tokens = tokenService.generateToken({...userDto}); 
        await tokenService.saveToken(userDto.id, tokens.refreshToken); 
        return {
            ...tokens, 
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await userModel.find(); 
        return users; 
    }
}

export default new UserService(); 