import { Router } from "express";

import { addgetStudio, deletegetStudio, getStudio, updategetStudio, getgetStudio ,} from "../controllers/studio_controller.js";

import { getStudioIconUpload, userAvatarUpload } from "../middlewares/upload.js";

// create a router 
const StudioRouter = Router();


//define routes
StudioRouter.post('/studio', getStudioIconUpload.single('icon'), addgetStudio);

StudioRouter.get('/studio', getgetStudio);

StudioRouter.get('/studio/count');

StudioRouter.get('/studio/:id',getStudio);

StudioRouter.patch('/studio/:id', updategetStudio);

StudioRouter.delete('/id', deletegetStudio);



// export router
export default StudioRouter;