import { loginUserValidator, registerUserValidator,updateProfileValidator } from "../vallidator/user_validator.js";
import User from "../models/user_models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

// import {mailTransporter} from "../utils/email.js";

export const registerUser = async (req, res, next) => {

    try {
        // validate user imput
        const { error, value } = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        //check if user does not exist
        const user = await User.findOne({ emaill: value.email });
        if (user) {
            return res.status(409).json('user already exist');
        }

        // hash their password
        console.log(value.password)
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        // save user into database
        await User.create({
            ...value,
            password: hashedPassword
        });

        // send user confirmation email
        // await mailTransporter.sendMail({
        //     to: value.email,
        //     subject: 'user registration',
        // })
        // respond to request
        res.json('user registered !');
    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        //validate user input
        const { error, value } = loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // find one user with identifier
        const user = await User.findOne({ email: value.email });
        if (!user) {
            return res.status(404).json('user does not exist');
        }
console.log(user.password) 
console.log(value.password)
        //compare their passwords
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            console.log(correctPassword)
            return res.status(401).json('invalid credentials');
        }
        //sign a token for the user
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }

        );
        //respond to request
        res.json({
            message: 'user logged in!',
            accessToken: token
        });
    } catch (error) {
        next(error);
    }
}

export const getProfile = async (req, res, next) => {
    try {
        // find authenticated usedr from database
        const user = await User.findById(req.auth.id).select({ password: false });
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export const logoutUser = (req, res, next) => {
    res.json('user logged out!');
}

export const updateProfile = (req, res, next) => {
    try {
        // validate user input
        const {error,value } = updateProfileValidator.validate(req.body);
        res.json('user profile updated');
    } catch (error) {
      next(error)  
    }
  
  };
