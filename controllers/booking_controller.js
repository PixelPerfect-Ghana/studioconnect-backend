
import express from 'express';

import Booking from "../models/booking_model.js";

const router = express.Router();

// create booking
// export const createBookings = async (req, res, next) => {
//   try {
//     const studio = await
//       studio.findById(req.body.studioId);
//     if (!studio) return
//     res.status(400).send('studio not found');

//     const booking = newBooking(req.body);
//     await booking.save();
//     try {
//       res.status(201).send(booking);



//     } catch (error) {
//       res.status(400).send(error);
//     }
//   } catch (error) {

//   }
// }

export const createBookings = async (req, res) => {
  try {
    const { studioId, userId, bookingDate, startTime, endTime } = req.body;

    // Validate the incoming data
    if (!studioId || !userId || !bookingDate || !startTime || !endTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new booking
    const newBooking = new Booking({
      studioId,
      userId,
      bookingDate,
      startTime,
      endTime,
      status: 'pending',  // Default status
    });

    // Save the booking to the database
    await newBooking.save();

    // Send a success response
    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get All Bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await booking.find().populate('studioId');
    res.send(bookings);
  } catch (err) {
    res.status(500).send(err);
  }
};


// Get Booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await booking.findById(id).populate('studioId');
    if (!booking) return res.status(404).send();
    res.send(booking);
  } catch (err) {
    res.status(500).send(err);
  }
};



// update booking
export const updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Studio = await StudioModel.findByIdAndUpdate(id);
    res.json('Studio updated');
  } catch (error) {
    next(error);
  }
};



// Cancel Booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdDelete(id);
    if (!booking) return res.status(404).send();
    booking.status = 'cancelled';
    await booking.save();
    res.send(booking);
  } catch (err) {
    res.status(400).send(err);
  }
};

