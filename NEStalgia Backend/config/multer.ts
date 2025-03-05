import multer from "multer";
import path from "path";
import crypto from "crypto";

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "..", "roms"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export default { storage: multerConfig };
