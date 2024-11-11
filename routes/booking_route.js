import { Router } from "express";
const router = express.Router();

import  { addBooking, deleteBooking, getAllBookings, updateBooking, getBookingById} from "../controllers/booking_contoller.js";
const bookingRouter = Router();

bookingRouter.get('/booking', getAllBookings);
bookingRouter.get.get('/booking', addBooking);
bookingRouter.get.patch('/booking', updateBooking);
bookingRouter.delete('/booking', deleteBooking);
bookingRouter.get('/booking', getBookingById);


export default bookingRouter;