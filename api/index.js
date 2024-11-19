import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { updateUser } from './controllers/user.controller.js';



dotenv.config();

mongoose.connect(process.env.MONGO).then( () => {console.log("mongodb is connected");});
try {
    
} catch (error) {
    
}((err) => {console.log("err");});
const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());



app.listen(3000, () => {
    console.log('server is running on port 3000!');
});

app.use('/api/auth',authRoutes);

app.use(express.static(path.join(__dirname,'/vite-project/dist')));
app.get('*', (req,res)=> {
    res.sendFile(path.join(__dirname, 'vite-project' , 'dist','index.html'));

});


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});