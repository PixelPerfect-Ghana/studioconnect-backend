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