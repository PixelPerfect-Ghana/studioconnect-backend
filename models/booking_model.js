

import { timeStamp } from "console";
import mongoose, { Schema, model } from "mongoose";

const bookingSchema = new Schema({
    studoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Studio',
        required: true
    },
    userId: {
        type: String,
        required: true
    },


    bookingDate: {
        type: Date,
        required: true
    },

    startTime: {
        type: String,
        required: true

    },
    endTime: {
        type: String,
        required: true

    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    
});
bookingSchema.index({name: 'text',title: 'text'});

// bookingSchema.plugin(toJSON);

// export const bookingModel = model('booking', bookingSchema)
const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
