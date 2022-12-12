import ErrorHandler from "../handlers/errorHandler";
import tokenService from "../services/tokenService";

export default function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization; 
        if(!authHeader) {
            return next(ErrorHandler.UnauthorizedError()); 
        }
        const accessToken = authHeader.split(' ')[1]; 
        if(!accessToken) {
            return next(ErrorHandler.UnauthorizedError()); 
        }
        const userData = tokenService.validateAccessToken(accessToken); 
        if(!userData) {
            return next(ErrorHandler.UnauthorizedError());
        }
        req.user = userData; 
        next(); 
    } catch (error) {
        return next(ErrorHandler.UnauthorizedError()); 
    }
}