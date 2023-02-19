const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const dotenv = require('dotenv')

// loading the env files
dotenv.config()

// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Vendor",
    format: async (req, file) => 'jpeg',
    public_id: (req, file) => 'computed-filename-using-request',
  },
});

module.exports = { cloudinary, storage }