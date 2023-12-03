const express = require('express');
const router = express.Router();
const upload = require('../multer').upload;
const auth = require('../auth');
const AuthController = require('../controllers/auth-controller');

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.post('/updateUserData', auth.verify, upload.single('profilePic'), AuthController.updateUserData);
router.get('/logout', AuthController.logoutUser);
router.get('/loggedIn', AuthController.getLoggedIn);
router.post('/forgotPassword', AuthController.forgotPassword)
router.post('/updatePassword/:userId/:token', AuthController.updatePassword);

module.exports = router;
