// local import
const uploader = require("../../utilities/singleUploader");

function avatarUpload(req, res, next) {
  const subFolderPath = "avatar";
  const allowedFormat = ["image/jpeg", "image/jpg", "image/png"];
  const allowedMaximumSize = 1000000;
  const formatErrorMessage = "Only .jpg .jpeg or .png format allowed";

  const upload = uploader(
    subFolderPath,
    allowedFormat,
    allowedMaximumSize,
    formatErrorMessage
  );

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = avatarUpload;
