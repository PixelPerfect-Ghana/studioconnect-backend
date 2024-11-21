import { BookingModel } from "../models/booking_model.js";
import { StudioModel } from "../models/studio_model.js";
import {
  createBookingValidator,
  updateBookingValidator,
  updateStatusValidator,
} from "../validators/booking_validator.js";

export const createBooking = async (req, res) => {
  try {
    const { error, value } = createBookingValidator.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }

    const { studio: studioId } = value;

    const studio = await StudioModel.findById(studioId);
    if (!studio) {
      return res.status(404).json({ message: "Studio not found" });
    }

    const newBooking = new BookingModel({
      ...value,
      user: req.auth.id,
    });
    await newBooking.save();

    // Add the booking to the studio's bookings array
    await StudioModel.findByIdAndUpdate(
      value.studio,
      { $push: { bookings: newBooking._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating booking",
      error: err.message,
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { error, value } = updateStatusValidator.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }

    const { status } = value;
    const { id } = req.params;

    const updatedBooking = await BookingModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({ message: "Booking status updated", booking: updatedBooking });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating booking status", error: err.message });
  }
};

// Get Bookings by User
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find({ user: req.auth.id }).populate(
      "studio",
      "title email location icon"
    );

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
      error: error.message,
    });
  }
};

// Get Studio Bookings
export const getStudioBookings = async (req, res) => {
  try {
    const studioId = req.params.id;
    const bookings = await BookingModel.find({ studio: studioId }).populate(
      "user",
      "firstName lastName email avatar"
    );

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
      error: error.message,
    });
  }
};

// Get Booking by ID
export const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await BookingModel.findById(id)
      .populate("studio", "title email location icon")
      .populate("user", "firstName lastName email avatar");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (err) {
    next();
  }
};

export const updateBookingDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = updateBookingValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.details.map((err) => err.message),
      });
    }

    const updatedBooking = await BookingModel.findByIdAndUpdate(
      id,
      { $set: value },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({
      message: "Booking updated successfully.",
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating booking details.",
      error: error.message,
    });
  }
};

// Delete Booking
export const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await BookingModel.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    if (booking.status !== "cancelled") {
      return res.status(400).json({
        message: "Booking can only be deleted if the status is 'cancelled'.",
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      message: "Booking deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while deleting the booking.",
      error: err.message,
    });
  }
};
