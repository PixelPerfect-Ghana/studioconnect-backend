import express from "express";
import { studioIconUpload, studioImagesUpload } from "../middlewares/upload.js";
import {
  addStudio,
  deleteStudio,
  getStudios,
  updateStudio,
  getStudioById,
} from "../controllers/studio_controller.js";

import { isAuthenticated, hasPermission } from "../middlewares/auth.js";

const studioRouter = express.Router();

studioRouter.post(
  "/studios",
  isAuthenticated,
  hasPermission("add_studio"),
  studioIconUpload.single("icon"),
  addStudio
);

// Public access
studioRouter.get("/studios", getStudios);

studioRouter.get("/studios/:id", getStudioById);

studioRouter.patch(
  "/studios/:id",
  isAuthenticated,
  hasPermission("update_studio"),
  //   studioIconUpload.single("icon"),
  studioImagesUpload,
  updateStudio
);

studioRouter.delete(
  "/studios/:id",
  isAuthenticated,
  hasPermission("delete_studio"),
  deleteStudio
);

export default studioRouter;
