import { Router } from "express";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
} from "../controllers/user_controller.js";
import { isAuthenticated, hasPermission } from "../middlewares/auth.js";
import { userAvatarUpload } from "../middlewares/upload.js";

//create router
const userRouter = Router();

//define routes
userRouter.post("/users/register", registerUser);

userRouter.post("/users/login", loginUser);

userRouter.get(
  "/users/me",
  isAuthenticated,
  hasPermission("get_profile"),
  getProfile
);

userRouter.post("/users/logout", isAuthenticated, logoutUser);

userRouter.patch(
  "/users/me",
  isAuthenticated,
  hasPermission("update_profile"),
  userAvatarUpload.single("avatar"),
  updateProfile
);

// export router
export default userRouter;
