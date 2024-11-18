import express from 'express';
import { StudioModel } from "../models/studio_model.js";
import { addStudioValidator } from '../validators/studio_vallidator.js';




export const  addStudio = async (req, res, next) => {
  try {
    const { error, value } = addStudioValidator.validate({ ...req.body, icon: req.file?.filename });
    if (error) {
      return res.status(422).json({ error: error.details[0].message });
    }
    await StudioModel.create({...value,user: req.auth.id});
    res.status(201).json({ message: 'Studio added!' });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export const getStudios = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
    const studios = await fetchStudios(JSON.parse(filter), JSON.parse(sort), parseInt(limit), parseInt(skip));
    res.status(200).json(studios);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const fetchStudios = async (filter, sort, limit, skip) => {
  return await StudioModel
    .find(filter)
    .sort(sort)
    .limit(limit)
    .skip(skip);
}

export const countStudio = async (req, res, next) => {
  try {
    const { filter = "{}" } = req.query;
    const count = await StudioModel.countDocuments(JSON.parse(filter));
    res.json({ count });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export const getStudioById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const studio = await StudioModel.findById(id);
    res.json(studio);
  } catch (error) {
   
    next(error);
  }
}

export const updateStudio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const studio = await StudioModel.findByIdAndUpdate(id);
    res.json({ message: 'Studio updated' });
  } catch (error) {
   
    next(error);
  }
}

export const deleteStudio = async (req, res, next) => {
  try {
    const { id } = req.params;
    await StudioModel.findByIdAndDelete(id);
    res.json({ message: 'Studio deleted' });
  } catch (error) {
    
    next(error);
  }
}