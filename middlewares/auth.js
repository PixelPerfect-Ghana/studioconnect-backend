
import { expressjwt } from "express-jwt";
// import User from '../models/user_models.js';

export const isAuthenticated = expressjwt({
    secret:process.env.JWT_PRIVATE_KEY,
    algorithms:['HS256']
})

export const hasPermission = (action) => {
return async (req,res,next) => {
    try {
        // find user from database

        const user =await UserModel.findById(req.auth.id);


        // use the user role to find their permission 
    
        const permission = permissions.find(value => value.role === user.role);
        if (!permission){
            return res.status(403).json('no permision foun');

        }
        // check if permission actions include action
         if (permission.actions.includes(action)) {
            next();
         } else{
            res.status(403).json('Action not allowed !');
         }

    } catch (error) {
        next(error);
    }
    }
}
