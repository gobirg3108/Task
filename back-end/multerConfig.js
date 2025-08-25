import multer from "multer";
import path from "path";



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});



const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|/;

  const ext = path.extname(file.originalname).toLocaleLowerCase();

  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Images and Pdf Only Allowed "), false);
  }
};

export const upload = multer({ storage, fileFilter });
