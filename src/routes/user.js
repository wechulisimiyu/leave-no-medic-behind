const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { roles } = require('../controllers/rolesController')

router.get('/register', (req, res) => {
    res.render('admin/register')
})

router.post('/register', userController.register)  

router.get('/login', (req, res) => {
    res.render('admin/login')
})

router.post('/login', userController.login)

router.get('/', (req, res) => {
    res.render('admin/admin')
})

router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);
 
router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);
 
router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);
 
router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

// Route for the dashboard page
router.get('/dashboard', userController.allowIfLoggedin, userController.grantAccess('readAny', 'dashboard'), (req, res) => {
  res.send('Welcome to the dashboard page');
});

// Route for the orders page
router.get('/orders', userController.allowIfLoggedin, userController.grantAccess('readAny', 'orders'), (req, res) => {
  res.send('Welcome to the orders page');
});

// Route for the payments page
router.get('/payments', userController.allowIfLoggedin, userController.grantAccess('readAny', 'payments'), (req, res) => {
  res.send('Welcome to the payments page');
});

// Route for the pickups page
router.get('/pickups', userController.allowIfLoggedin, userController.grantAccess('readAny', 'pickups'), (req, res) => {
  res.send('Welcome to the pickups page');
});

// Route for the vendors page
router.get('/vendors', userController.allowIfLoggedin, userController.grantAccess('readAny', 'vendors'), (req, res) => {
  res.send('Welcome to the vendors page');
});

// Route for the stock page
router.get('/stock', userController.allowIfLoggedin, userController.grantAccess('readAny', 'stock'), (req, res) => {
  res.send('Welcome to the stock page');
});

// Route for the profile page
router.get('/admin/profile/:userId', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'profile'), (req, res) => {
    res.render('admin/profile', { user: req.user });
  });

// Route for editing the profile
router.put('/profile/:userId', userController.allowIfLoggedin, userController.grantAccess('updateOwn', 'profile'), (req, res) => {
  res.send('You can edit your profile');
});

// Route for deleting the profile
router.delete('/profile/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteOwn', 'profile'), (req, res) => {
  res.send('You can delete your profile');
});

// Route for the admin page
router.get('/admin', userController.allowIfLoggedin, userController.grantAccess('readAny', 'admin'), (req, res) => {
    console.log(req.user)
    res.render('admin/admin', { user: req.user });
});


module.exports = router