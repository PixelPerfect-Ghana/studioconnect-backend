import multer from "multer";

import { multerSaveFilesOrg } from "multer-savefilesorg";

export const studioIconUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/studio-api/vendor/*'
    }),
    preservePath: true
});

export const userAvatarUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_AOI_KEY,
        relativePath: '/useravatar/users/*',
    }),
    preservePath: true
});