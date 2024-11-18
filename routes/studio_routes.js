// import { Router } from "express";

// import { addStudio, deleteStudio, getStudios, updateStudio, getStudioById,} from "../controllers/studio_controller.js";

// import { studioIconUpload } from "../middlewares/upload.js";
// import { isAuthenticated, hasPermission } from "../middlewares/auth.js";

// // create a router 
// const studioRouter = Router();


// //define routes
// studioRouter.post('/studios', studioIconUpload.single('icon'), addStudio);

// studioRouter.get('/studios', getStudios);

// studioRouter.get('/studios/count');

// studioRouter.get('/studios/:id',getStudioById);

// studioRouter.patch('/studios/:id', updateStudio);

// studioRouter.delete('/studios/:id', deleteStudio);


// // export router
// export default studioRouter;


import express from "express";
import { studioIconUpload } from "../middlewares/upload.js";
import { addStudio, deleteStudio, getStudios, updateStudio, getStudioById, } from "../controllers/studio_controller.js";

import { isAuthenticated, hasPermission } from "../middlewares/auth.js";

const studioRouter = express.Router();



studioRouter.post("/studios", isAuthenticated, hasPermission("add_studio"),studioIconUpload.single('icon') ,addStudio);

// Public access
studioRouter.get("/studios", getStudios);

studioRouter.get("/studios/:id", getStudioById); 

studioRouter.patch("/studios/:id", isAuthenticated, hasPermission("update_studio"), updateStudio);

studioRouter.delete("/studios/:id", isAuthenticated, hasPermission("delete_studio"), deleteStudio);

export default studioRouter;
