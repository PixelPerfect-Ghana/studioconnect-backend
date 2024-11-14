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
// import { Router } from "express";
// import {
//   createBookings,
//   getAllBookings,
//   getBookingById,
//   updateBooking,
//   deleteBooking,
// } from "../controllers/booking_controller.js";

// const bookingRouter = Router();

// // Route to create a new booking
// bookingRouter.post('/bookings', createBookings);

// // Route to get all bookings
// bookingRouter.get('/bookings', getAllBookings);

// // Route to get a single booking by ID
// bookingRouter.get('/bookings/:id', getBookingById);

// // Route to update a booking by ID
// bookingRouter.patch('/bookings/:id', updateBooking);

// // Route to delete a booking by ID
// bookingRouter.delete('/bookings/:id', deleteBooking);

// export default bookingRouter;
