// external import
const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

function uploader(
  subFolderPath,
  allowedFormat,
  allowedMaximumSize,
  formatErrorMessage
) {
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subFolderPath}/`;

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },

    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });

  //   final multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: allowedMaximumSize,
    },
    fileFilter: (req, file, cb) => {
      if (allowedFormat.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(formatErrorMessage));
      }
    },
  });

  return upload;
}

module.exports = uploader;
