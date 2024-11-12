import { Router } from "express";

import { addStudio, deleteStudio, getStudios, updateStudio, getStudioById,} from "../controllers/studio_controller.js";

import { studioIconUpload } from "../middlewares/upload.js";

// create a router 
const studioRouter = Router();


//define routes
studioRouter.post('/studios', studioIconUpload.single('icon'), addStudio);

studioRouter.get('/studios', getStudios);

studioRouter.get('/studios/count');

studioRouter.get('/studios/:id',getStudioById);

studioRouter.patch('/studios/:id', updateStudio);

studioRouter.delete('/studios/:id', deleteStudio);


// export router
export default studioRouter;