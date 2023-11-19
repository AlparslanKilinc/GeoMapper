const express = require('express');
const router = express.Router();
const upload = require('../multer').upload;
const AuthController = require('../controllers/auth-controller');

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.post('/updateUser/:id', AuthController.updateUser);
router.post(
  '/updateUserProfilePic/:id',
  upload.single('profilePic'),
  AuthController.updateUserProfilePic
);
router.get('/logout', AuthController.logoutUser);
router.get('/loggedIn', AuthController.getLoggedIn);

module.exports = router;
