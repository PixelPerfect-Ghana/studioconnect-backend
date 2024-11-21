import { BookingModel } from "../models/booking_model.js";
import { StudioModel } from "../models/studio_model.js";
import { UserModel } from "../models/user_models.js";
import {
  addStudioValidator,
  updateStudioValidator,
} from "../validators/studio_validator.js";

export const addStudio = async (req, res, next) => {
  try {
    const { error, value } = addStudioValidator.validate({
      ...req.body,
      icon: req.file?.filename,
    });
    if (error) {
      return res.status(422).json({ error: error.details[0].message });
    }

    // Create the studio
    const studio = await StudioModel.create({
      ...value,
      owner: req.auth.id,
    });

    // Update user role to "vendor"
    await UserModel.findByIdAndUpdate(req.auth.id, { role: "vendor" });

    res.status(201).json({
      message: "Studio added successfully!",
      studio,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getStudios = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}", skip = 0, limit = 0 } = req.query;
    const studios = await fetchStudios(
      JSON.parse(filter),
      JSON.parse(sort),
      parseInt(limit),
      parseInt(skip)
    );
    res.status(200).json(studios);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const fetchStudios = async (filter, sort, limit, skip) => {
  return await StudioModel.find(filter)
    .sort(sort)
    .limit(limit)
    .skip(skip)
    .populate("owner", "firstName lastName email");
};

export const getStudioById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const studio = await StudioModel.findById(id).populate(
      "owner",
      "firstName lastName email"
    );
    if (!studio) {
      return res.status(404).json({ message: "Studio not found" });
    }
    res.status(200).json(studio);
  } catch (error) {
    next(error);
  }
};

export const updateStudio = async (req, res, next) => {
  try {
    const studioId = req.params.id;

    const icon = req.file ? req.file.filename : null;
    const images =
      req.files && req.files.length > 0
        ? req.files.map((file) => file.filename)
        : [];

    const { error, value } = updateStudioValidator.validate({
      ...req.body,
      ...(icon && { icon }),
      ...(images.length > 0 && { images }),
    });
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }
    const studio = await StudioModel.findByIdAndUpdate(studioId, value, {
      new: true,
      runValidators: true,
    });

    if (!studio) {
      return res.status(404).json({ message: "Studio not found" });
    }
    res.status(200).json({ message: "Studio updated successfully!", studio });
  } catch (error) {
    next(error);
  }
};

export const deleteStudio = async (req, res, next) => {
  try {
    const { id: studioId } = req.params;

    // Find the studio to delete
    const studio = await StudioModel.findById(studioId);
    if (!studio) {
      return res.status(404).json({ message: "Studio not found" });
    }

    // Delete all bookings associated with this studio
    await BookingModel.deleteMany({ studio: studioId });

    // Revert the user's role to "user"
    await UserModel.findByIdAndUpdate(studio.owner, { role: "user" });

    // Delete the studio
    await studio.deleteOne();

    res.status(200).json({
      message: `Studio ${studioId} and all associated bookings deleted successfully!`,
    });
  } catch (error) {
    next(error);
  }
};

export const countStudio = async (req, res, next) => {
  try {
    const { filter = "{}" } = req.query;
    const count = await StudioModel.countDocuments(JSON.parse(filter));
    res.json({ count });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
