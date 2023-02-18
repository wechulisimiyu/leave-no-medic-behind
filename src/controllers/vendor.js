const multer = require('multer');
const { storage } = require('../..///config/cloudinary');
const Vendor = require('../models/Vendor');

// Your route handler function for POST requests to /vendors
exports.createVendor = async (req, res) => {
  try {
    const {
      name,
      regNumber,
      yearOfStudy,
      typeOfBusiness,
      whatItSells,
      helperName,
    } = req.body;

    const vendor = new Vendor({
      name,
      regNumber,
      yearOfStudy,
      typeOfBusiness,
      whatItSells,
      helperName,
      schoolIdPic: fileUrl, // store the file path in the vendor model
    });

    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// controller function to handle the file upload
exports.uploadVendorPic = (req, res, next) => {
    const upload = multer({ storage }).single('schoolIdPic');
    upload(req, res, function (err) {
      if (err) {
        return next(err);
      }
      const fileUrl = req.file.path
      res.json({ fileUrl: fileUrl })
    });
};
