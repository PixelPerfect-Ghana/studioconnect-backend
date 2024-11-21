import { Router } from "express";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";
import {
  createBooking,
  deleteBooking,
  getBookingById,
  getStudioBookings,
  getUserBookings,
  updateBookingDetails,
  updateBookingStatus,
} from "../controllers/booking_controller.js";

const bookingRouter = Router();

bookingRouter.post("/bookings", isAuthenticated, createBooking);
bookingRouter.get("/bookings", isAuthenticated, getUserBookings);

bookingRouter.patch(
  "/bookings/:id/status",
  isAuthenticated,
  hasPermission("update_booking_status"),
  updateBookingStatus
);
bookingRouter.get(
  "/bookings/studios/:id",
  isAuthenticated,
  hasPermission("get_studio_bookings"),
  getStudioBookings
);
bookingRouter.get("/bookings/:id", isAuthenticated, getBookingById);
bookingRouter.patch("/bookings/:id", isAuthenticated, updateBookingDetails);
bookingRouter.delete("/bookings/:id", isAuthenticated, deleteBooking);
export default bookingRouter;
