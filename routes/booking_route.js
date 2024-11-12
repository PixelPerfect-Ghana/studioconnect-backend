// import express from 'express';

import { Router } from "express";
import { createBookings, deleteBooking, getAllBookings, updateBooking, getBookingById } from "../controllers/booking_controller.js";

const bookingRouter = Router();

bookingRouter.post('/bookings', createBookings);
bookingRouter.get('/bookings', getAllBookings);
bookingRouter.get('/bookings/:id', getBookingById);
bookingRouter.patch('/bookings/:id', updateBooking);
bookingRouter.delete('/bookings/:id', deleteBooking);

export default bookingRouter;
