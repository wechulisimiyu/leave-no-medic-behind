const multer = require('multer');
const { storage, cloudinary } = require('../..///config/cloudinary');
const Vendor = require('../models/Vendor');

// Set up Multer middleware for file uploads
const upload = multer({ storage: storage });

// Your route handler function for POST requests to /vendors
exports.createVendor = async (req, res) => {
    const {
        name,
        regNumber,
        yearOfStudy,
        typeOfBusiness,
        whatItSells,
        helperName,
      } = req.body;
  
    try {
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Vendors"
    })
    
    const vendor = await Vendor.create({
        name,
        regNumber,
        yearOfStudy,
        typeOfBusiness,
        whatItSells,
        helperName,
        schoolIdPic: {
            public_id: result.public_id,
            url: result.secure_url
        }
    });

    if (req.file) {
      fs.unlinkSync(req.file.path);
    }    

    res.status(201).json(vendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};