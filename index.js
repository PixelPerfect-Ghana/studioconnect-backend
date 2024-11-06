
import express from 'express';
import mongoose from 'mongoose';
import studioRouter from './routes/studio_routes.js'
import userRouter from './routes/user_routes.js';


//connect to database
await mongoose.connect(process.env.MONGO_URI);

// create an express app
const app = express();


// use the middleware
app.use(express.json());

// use routes
app.use(studioRouter);
app.use(userRouter);

 
// listen for incoming requests
app.listen(3000, () => {
    console.log('app is listening on port 3000');
});






