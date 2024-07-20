import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/errorHandler.js';

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next(errorHandler(401, "Please provide complete data!!!"));
    }

    try {
        const user = await User.findOne({$or: [{ email: email },{ username: username }]});

        if (user) return next(errorHandler(409, "User already exists!!"))
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        
        return res.status(201).json({ success: true, message: "User registered successfully!!",user: newUser });

    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res, next) =>{
    const { email, password } = req.body;

    if (!email || !password) {
        return next(errorHandler(401, "Please provide complete data!!!"));
    }

    try {
        const user = await User.findOne({email});

        if (!user) {
            return next(errorHandler(409, "User does not exists!!"));
        }

        const comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            next(errorHandler(401,"Wrong Credentials!!!"));
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        
        const {password:pass, ...rest} = user._doc

        return res.cookie('access_token', token, { httpOnly: true }).status(201).json({ success: true, message: "User registered successfully!!",user: rest });

    } catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json({messgae:"User signout succeessfully!!!!"})
    } catch (error) {
        next(error)
    }
}