import { Router } from "express";
const router = express.Router();

import  { createBookings, deleteBooking, getAllBookings, updateBooking, getBookingById} from "../controllers/booking_contoller.js";

const bookingRouter = Router();

bookingRouter.get('/bookings', createBookings);
bookingRouter.get.get('/bookings', getAllBookings);
bookingRouter.get.patch('/bookings', updateBooking);
bookingRouter.delete('/booking', deleteBooking);
studioRouter.get('/bookings/:id',getBookingById);

export default bookingRouter;