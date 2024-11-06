
import { ReviewModel } from "../models/review_model.js";

export const getAllReviews = async (req, res, next) => {
    try {
        const allReview = await ReviewModel.find();
        res.status(200).json(allReview);
    } catch (error) {
        next(error);
    }
}

export const getReviewById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await ReviewModel.findById(id);
        if (book) {
            res.status(200).json(book);
        }
        else {
            return res.status(200).json({ message: 'Review not found' });
        }
    } catch (error) {
        next(error);
    }
}


// export const postReviews = (req,res,next) => {

//     res.status(200) .json('lets here your feedback');
// }

export const postReviews = async (req, res, next) => {
    try {
        const allReview = await ReviewModel.create(req.body);
        res.status(200).json(allReview);
    } catch (error) {
        next(error);
    }
};

export const updateReviewById = async (req, res, next) => {
    try {
        const allReview = await ReviewModel.findByIdAndUpdate(req.params.id, { new: true });
        res.status(201).json(allReview);
    } catch (error) {
        next(error);
    }
};
// export const updateReviewById =async (req, res, next) => {
//     try {
//      const allReview = await ReviewModel.findById(req.body);
//      res.status(201).json(allReview);
//     } catch (error) {
//      next(error);
//     }
//  };

export const deleteReviewById = async (req, res, next) => {
    try {
        const allReview = await ReviewModel.findById(req.params.id);
        res.status(201).json(allReview);
    } catch (error) {
        next(error);
    }
}
