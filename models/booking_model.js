

import mongoose, { Schema, model} from "mongoose";
const bookingschema =new Schema({
    studoId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref:'Studio',
        required: true
    },
userId:{
type: String,
required : true
},


bookingDate: {
    type : Date,
    required : true
},

startTime : {
    type: String,                                        
    required: true

},
endTime:{
    type:String,
    required: true

},
status:{
    required: String,
    enum:['pending','confirmed','cancelled'],
    default:'pending'
}
});

 export const bookingModel = model('booking', bookingschema)
