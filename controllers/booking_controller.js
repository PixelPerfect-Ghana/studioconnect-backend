
import Booking from "../models/booking_model.js";

export const createBookings = async (req, res) => {
  try {
    const { name, email, bookingDate, startTime, endTime } = req.body;

    if (!name || !email || !bookingDate || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const booking = new Booking({ name, email, bookingDate, startTime, endTime });
    const savedBooking = await booking.save();

    res.status(201).json({ message: "Booking created successfully.", booking: savedBooking });
  } catch (error) {
    res.status(500).json({ message: "Failed to create booking.", error: error.message });
  }
};


// Get All Bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('studioId'); // Use uppercase `Booking`
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate('studioId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Booking
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });

    res.status(200).json({
      message: 'Booking updated successfully',
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete Booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id); // Use `findByIdAndDelete` method
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    res.status(200).json({
      message: 'Booking cancelled successfully',
      booking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};




// // Get All Bookings
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await booking.find().populate('studioId');
//     res.send(bookings);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };


// // Get Booking by ID
// export const getBookingById = async (req, res) => {
//   try {
//     const booking = await booking.findById(id).populate('studioId');
//     if (!booking) return res.status(404).send();
//     res.send(booking);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };



// // update booking
// export const updateBooking = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const Studio = await StudioModel.findByIdAndUpdate(id);
//     res.json('Studio updated');
//   } catch (error) {
//     next(error);
//   }
// };



// // Cancel Booking
// export const deleteBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findByIdDelete(id);
//     if (!booking) return res.status(404).send();
//     booking.status = 'cancelled';
//     await booking.save();
//     res.send(booking);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };

