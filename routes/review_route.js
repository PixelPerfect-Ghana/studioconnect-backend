import { Router } from "express";

import { getAllReviews,getReviewById,updateReviewById,deleteReviewById, postReviews } from "../controllers/review_controller.js";

export const reviewRouter = Router();

reviewRouter.post('/reviews', postReviews);
reviewRouter.get('/reviews', getAllReviews);
reviewRouter.get('/reviews/:id', getReviewById);
reviewRouter.patch('/reviews/:id', updateReviewById);
reviewRouter.delete('/reviews/:id', deleteReviewById);

