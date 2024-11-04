import { StudioModel } from "../models/studio_model";
const router = express.Router();




export const addStudio = async (req, res, next) => {
    try {
        // validate user input
        // write business to database
        const { error, value } = addStudioValidator.validate({
            ...req.body,
            icon: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }

        await StudioModel.create(value);
        // respond to request
        res.status(201).json('Studio was added!');
    } catch (error) {
        next(error);
    }
}
export const getStudios = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
        // fetch todos from datababe
        const studio = await StudioModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
        // return response
        res.status(200).json(Studio);
    } catch (error) {
        next(error);
    }
}

export const countStudio = async (req, res, next) => {
    try {
        const { } = req.query;
        // count business in database
        const count = await StudioModel.countDocuments(JSON.parse(filter));
        // respond to request
        res.json({ count });
    } catch (error) {
        next(error);
    }

}

export const getStudio = async (req, res, next) => {
    try {
        const { id } = req.params;
        const Studio = await StudioModel.findById(id);
        res.json(todo);

    } catch (error) {
        next(error);
    }
}

export const updateStudio = async (req, res, next) => {
    try {
        const { id } = req.params;
        const Studio = await StudioModel.findByIdAndUpdate(id);
        res.json('Studio updated');
    } catch (error) {
        next(error);
    }
}

export const deleteStudio = async(req, res, next) => {
    try {
const {id} = req.params;
const studio = await StudioModel.findByIdAndDelete(id);
        res.json('studio deleted');
    } catch (error) {
        res.status(400).json({ messaage:error.message});
        next(error);
    }
};


