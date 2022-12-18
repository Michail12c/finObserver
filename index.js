import dotenv from 'dotenv';
dotenv.config(); 
import  express from "express"; 
import mongoose from "mongoose"; 
import router from './router/index.js'; 
import cors from "cors"; 
import cookieParser from "cookie-parser";
import errorMiddleware from './middlewares/errorMiddleware.js';

const PORT = process.env.PORT || 5000; 
const app = express(); 

app.use(express.json()); 
app.use(cookieParser()); 
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
})); 
app.use('/api', router); 
app.use(errorMiddleware);

async function startApp() {
    try {
        await mongoose.connect(process.env.DB_URL); 
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));  
    } catch (error) {
        console.log("error", error);
    }
}; 

startApp(); 