export const permissions = [
  {
    role: "user",
    actions: ["get_profile", "update_profile", "add_studio"],
  },

  {
    role: "vendor",
    actions: [
      "get_profile",
      "update_profile",
      "update_studio",
      "get_studio",
      "delete_studio",
      "update_booking_status",
      "get_studio_bookings",
    ],
  },
];
