const auth = require('../auth');
const User = require('../models/user-model.js');
const bcrypt = require('bcryptjs');
const { uploadImage, isDuplicateImage, deleteFileFromGCS } = require('../imageService');
const jwt = require('jsonwebtoken');
require('dotenv').config();
var nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('463254320848-cpd89v6bolf2n4gs5bcdo3g119788j37.apps.googleusercontent.com');

const sendUserResponse = (res, user) => {
  return res.status(200).json({
    success: true,
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
      bio: user.bio,
      id: user._id,
      profilePicPath: user.profilePicPath,
      googleUserId: user.googleUserId,
      drafts:user.draftedMaps,
      published:user.publishedMaps,
      bookmarks:user.bookmarkedMaps,
    },
    loggedIn: true
  });
};

loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ errorMessage: 'Please enter all required fields' });
    }
    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      return res.status(401).json({ errorMessage: 'Wrong username or password provided' });
    }
    const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: 'Wrong username or password provided' });
    }
    const token = auth.signToken(existingUser._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    return sendUserResponse(res, existingUser);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
};

googleLogin = async (req, res) => {
  const idToken = req.body.idToken;
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: '463254320848-cpd89v6bolf2n4gs5bcdo3g119788j37.apps.googleusercontent.com'
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    const existingUser = await User.findOne({ googleUserId: userid });
    if (!existingUser) {
      const newUser = new User({
        googleUserId: userid,
        userName: payload['email'],
        firstName: payload['given_name'],
        lastName: payload['family_name'],
        email: payload['email'],
        profilePicPath: payload['picture']
      });
      const savedUser = await newUser.save();
      const token = auth.signToken(savedUser._id);
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      });
      return sendUserResponse(res, savedUser);
    } else {
      const token = auth.signToken(existingUser._id);
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      });

      return sendUserResponse(res, existingUser);
    }
  } catch (error) {
    console.error(error);
    return res.status(200).json({ errorMessage: 'User already exists' });
  }
};

registerUser = async (req, res) => {
  try {
    const { userName, firstName, lastName, email, password, passwordVerify } = req.body;
    if (!userName || !firstName || !lastName || !email || !password || !passwordVerify) {
      return res.status(400).json({ errorMessage: 'Please enter all required fields' });
    }

    if (password.length < 8) {
      console.log('Please enter a password of at least 8 characters');
      return res
        .status(400)
        .json({ errorMessage: 'Please enter a password of at least 8 characters' });
    }

    if (password !== passwordVerify) {
      console.log('Please enter the same password twice');
      return res.status(400).json({ errorMessage: 'Please enter the same password twice' });
    }
    const existingUserByEmail = await User.findOne({ email });
    const existingUserByUserName = await User.findOne({ userName });

    if (existingUserByEmail) {
      console.log('An account with this email address already exists');
      return res
        .status(400)
        .json({ errorMessage: 'An account with this email address already exists' });
    }

    if (existingUserByUserName) {
      console.log('An account with this User Name already exists');
      return res.status(400).json({ errorMessage: 'An account with this username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ userName, firstName, lastName, email, passwordHash });
    const savedUser = await newUser.save();

    const token = auth.signToken(savedUser._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    return sendUserResponse(res, savedUser);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
};

getLoggedIn = async (req, res) => {
  try {
    let userId = auth.verifyUser(req);
    if (!userId) {
      return res.status(200).json({
        loggedIn: false
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }

    return sendUserResponse(res, user);
  } catch (err) {
    console.error(err);
    return res.status(401).json(false);
  }
};

logoutUser = (req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: 'none'
    })
    .send();
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;

  try {
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail.googleUserId.length > 0) {
      return res.status(401).json({
        errorMessage:
          'Cannot reset password of a Google Account. Please use the "Login with Google" option'
      });
    }

    if (!existingUserByEmail) {
      return res.status(401).json({ errorMessage: 'Invalid Email' });
    }

    const id = existingUserByEmail._id;
    const secret = process.env.JWT_SECRET + existingUserByEmail.passwordHash;
    const token = jwt.sign({ email: existingUserByEmail.email, id: id }, secret, {
      expiresIn: '15m'
    });

    const resetLink = `https://geomapper-c6jr.onrender.com/setNewPassword?id=${id}&token=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'geomapperapp2024@gmail.com',
        pass: 'ewhtogjlfmyayulf'
      }
    });

    const mailOptions = {
      from: 'geomapperapp2024@gmail.com',
      to: email,
      subject: 'Password Reset',
      text:
        'Hello, \n We received a request to reset the password for your Geomapper account. To proceed with the password reset, please click on the link below:' +
        "\n If you didn't request a password reset, you can ignore this email, and your password will remain unchanged." +
        '\nFor security reasons, this link will expire in 10 minutes.' +
        "\nIf you haven't reset your password within this time frame, you can request another password reset by visiting the forgot password page on our app.\nThank you,\n GeoMappper Team\n" +
        resetLink
    };

    await transporter.sendMail(mailOptions); // Wait for the email to be sent

    // Respond after the email is sent
    res.json({ message: 'Password reset link sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: 'Error resetting password' });
  }
};

updatePassword = async (req, res) => {
  try {
    const { userId, token } = req.params;
    const newPassword = req.body.newPassword;
    const confirmNewPassword = req.body.confirmNewPassword;
    const secret = process.env.JWT_SECRET + (await User.findById(userId)).passwordHash;
    jwt.verify(token, secret);
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ errorMessage: 'Passwords do not match' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await User.findByIdAndUpdate(userId, { passwordHash: hashedPassword });
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ errorMessage: 'Internal Server Error' });
  }
};

updateUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const updateFields = {};

    if (req.body) {
      if (req.body.userName) {
        const existingUserByUserName = await User.findOne({ userName: req.body.userName });
        if (existingUserByUserName && String(existingUserByUserName._id) !== String(userId)) {
          return res
            .status(400)
            .json({ errorMessage: 'An account with this User Name already exists' });
        }
      }

      for (let key in req.body) {
        if (req.body[key] !== undefined && req.body[key] !== null) {
          updateFields[key] = req.body[key];
        }
      }
    }

    if (req.file) {
      const file = req.file;
      const existingUser = await User.findById(userId);
      let isDuplicate = false;

      if (existingUser && existingUser.profilePicPath) {
        isDuplicate = await isDuplicateImage(file, existingUser.profilePicPath);
        if (isDuplicate) {
          updateFields.profilePicPath = existingUser.profilePicPath;
        }
      }

      if (!isDuplicate) {
        const publicUrl = await uploadImage(file, file.originalname);
        updateFields.profilePicPath = publicUrl;

        // Delete old profile picture from GCS if it exists
        if (existingUser && existingUser.profilePicPath) {
          await deleteFileFromGCS(existingUser.profilePicPath);
        }
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }

    return sendUserResponse(res, updatedUser);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ errorMessage: 'Error updating user data' });
  }
};

module.exports = {
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
  updateUserData,
  forgotPassword,
  updatePassword,
  googleLogin
};
