import multer, { diskStorage } from "multer";
import { join, extname } from "path";

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "/../../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}_${file.originalname}`);
  },
});

const uploads = multer({
  storage: storage,
  limits: { fileSize: 1000000 * 100 },
}).single("file");

export { uploads };
