import multer from "multer";
import path from "path";
import crypto from "crypto";

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "..", "roms"));
  },
  filename: (req, file, cb) => {
    const randomName = crypto.randomBytes(16).toString("hex");
    const fileExtension = path.extname(file.originalname);
    const uniqueName = `${randomName}${fileExtension}`;
    cb(null, uniqueName);
  },
});

export default { storage: multerConfig };
