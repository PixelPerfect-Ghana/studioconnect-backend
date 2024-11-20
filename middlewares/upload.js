import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const studioIconUpload = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: "/studio-connect/studios/icons/*",
  }),
  preservePath: true,
});

export const studioImagesUpload = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: "/studio-connect/studios/images/*",
  }),
  preservePath: true,
}).array("images[]");

export const userAvatarUpload = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: "/studio-connect/users/avatars/*",
  }),
  preservePath: true,
});
