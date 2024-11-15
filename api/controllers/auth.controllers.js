import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const signup = async (req,res,next) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password || username ==='' ||email === '' || password === '') {
        next(errorHandler(400,'all fields are required'));

    }
    
    const newUser = new User({
        username:username,
        email:email,
        password:password,
    });

    try {
        await newUser.save();
        res.json('signup successful');
    } catch (error) {
        next(error);

    }

    
};
export const signin = async(req, res, next) =>{
    const  {email, password} = req.body;

    if (!email||!password || email === '' || password === '') {
        next(errorHandler(400,'all fields are required'));}
        try {
            const validUser = await User.findOne({email});
            if (!validUser) {
                return next(errorHandler(404,'user not found'));
            }
            const validPassword = await User.findOne({password});
            if (!validPassword) {
                return next(errorHandler(404,'invalid password'));

        }
        const token = jwt.sign(
            {id:validUser._id},process.env.JWT_SECRET);
            const {password:pass, ...rest} = validUser._doc;
            res.status(200).cookie('access_token', token,{httpOnly:true,}).json(rest);
    } 

        catch (error){
            next(error);
        }


    };
