import ErrorHandler from "../handlers/errorHandler";

export default function errorMiddleware(err, red, res, next) { 
    if(err instanceof ErrorHandler) {
        return res.status(err.status).json({ message: err.message, errors: err.errors }); 
    }

    return res.status(500).json({ message: "Unexpected error" }); 
}