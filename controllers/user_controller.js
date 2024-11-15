import { loginUserValidator, registerUserValidator, updateProfileValidator } from "../validators/user_validator.js";
import { UserModel } from "../models/user_models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

// import {mailTransporter} from "../utils/email.js";
export const registerUser = async (req, res, next) => {
    try {
      const { error, value } = registerUserValidator.validate(req.body);
      if (error) {
        return res.status(422).json({ message: error.details[0].message });
      }
  
      // Ensure the role is valid
      const { role = "user" } = value;
      if (!["user", "vendor"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
  
      const hashedPassword = bcrypt.hashSync(value.password, 10);
  
      await UserModel.create({
        ...value,
        password: hashedPassword,
      });
  
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      next(error);
    }
  };
  

export const loginUser = async (req, res, next) => {
    try {
        //validate user input
        const { error, value } = loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // find one user with identifier
        const user = await UserModel.findOne({ email: value.email,role:value.role });
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
            { expiresIn: '48h' }

        );
        //respond to request
        res.json({
            message: 'user logged in!',
            accessToken: token,
            role: user.role
        });
    } catch (error) {
        next(error);
    }
}

export const getProfile = async (req, res, next) => {
    try {
        // find authenticated usedr from database
        const user = await UserModel
        .findById(req.auth.id)
        .select({ password: false });
        // Respond to request
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
        const { error, value } = updateProfileValidator.validate(req.body);
        res.json('user profile updated');
    } catch (error) {
        next(error)
    }

};


