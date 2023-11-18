const auth = require('../auth');
const User = require('../models/user-model');
const bcrypt = require('bcryptjs');

const sendUserResponse = (res, user) => {
  return res.status(200).json({
    success: true,
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
      bio: user.bio,
      id: user._id
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
      return res
        .status(400)
        .json({ errorMessage: 'An account with this username already exists' });
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

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.body.userName) {
      const existingUserByUserName = await User.findOne({ userName: req.body.userName });
      if (existingUserByUserName && String(existingUserByUserName._id) !== String(userId)) {
        return res
          .status(400)
          .json({ errorMessage: 'An account with this User Name already exists' });
      }
    }

    const updateFields = Object.keys(req.body).reduce((acc, key) => {
      if (req.body[key] !== undefined && req.body[key] !== null) {
        acc[key] = req.body[key];
      }
      return acc;
    }, {});

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ errorMessage: 'User not found' });
    }

    return sendUserResponse(res, updatedUser);
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

module.exports = {
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
  updateUser
};
