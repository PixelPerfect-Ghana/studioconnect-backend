import { Router } from "express";

import { addStudio, deleteStudio, getStudios, updateStudio, getStudioById,} from "../controllers/studio_controller.js";

import { studioIconUpload, userAvatarUpload } from "../middlewares/upload.js";

// create a router 
const studioRouter = Router();


//define routes
studioRouter.post('/studio', studioIconUpload.single('icon'), addStudio);

studioRouter.get('/studio', getStudios);

studioRouter.get('/studio/count');

studioRouter.get('/studio/:id',getStudioById);

studioRouter.patch('/studio/:id', updateStudio);

studioRouter.delete('/id', deleteStudio);



// export router
export default studioRouter;