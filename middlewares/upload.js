import multer from "multer";

import { multerSaveFilesOrg } from "multer-savefilesorg";

export const studioIconUpload =  multer({
    storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_AOI_KEY,
    // relativePath: 
}),
preservePath: true
});

export const userAvatarUpload =  multer({
    storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_AOI_KEY,
    relativePath: '/todo-api/users/*',
}),
preservePath: true
});