import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    rating: {type: Number,
     min: [1,'Rating must be at least 1'],
     max:[5, 'Rating must be at most 5'],
         required: [true, 'Rating is required' ]
        },

    Comment: {type: String},
    Name: { type: String},
    studiotitle: {type: String},
});


export const ReviewModel = model('review', reviewSchema);


// import mongoose from 'mongoose';

// const reviewSchema = new mongoose.Schema({
//   studioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Studio', required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   rating: { type: Number, required: true },
//   comment: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Review = mongoose.model('Review', reviewSchema);

// export default Review;
