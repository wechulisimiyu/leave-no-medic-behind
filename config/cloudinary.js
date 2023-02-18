const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv')

// loading the env files
dotenv.config({ path: './config.env' })

// Configuration 
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET
// });

cloudinary.config({
  cloud_name: "drgmee3w5",
  api_key: "979832354547497",
  api_secret: "2nnD-nJYMouYbSCoeSsII-1USwU"
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Vendors',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
})

module.exports = { storage };