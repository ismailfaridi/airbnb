// npm i multer-storage-cloudinary
// npm i cloudinary
// For connection b/w cloudinary and multer parser(files receiving utility)

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "airbnb", // folder name in cloudinary
    allowedFormats: ["jpg", "jpeg", "png"],
  },
});

module.exports = { cloudinary, storage };