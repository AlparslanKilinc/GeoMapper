const auth = require('../auth');
const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const { bucket } = require('../googleCloudStorage');
const crypto = require('crypto');
const fetch = require('node-fetch');

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
      profilePicPath: user.profilePicPath
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

const updateUserData = async (req, res) => {
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
      const blob = bucket.file(file.originalname);
      const existingUser = await User.findById(userId);
      let isDuplicate = false;

      if (existingUser && existingUser.profilePicPath) {
        isDuplicate = await isDuplicateImage(file, existingUser.profilePicPath);
        if (isDuplicate) {
          updateFields.profilePicPath = existingUser.profilePicPath;
        }
      }

      if (!isDuplicate) {
        // Upload the file to Google Cloud Storage
        const blobStream = blob.createWriteStream({
          resumable: false
        });

        blobStream.on('error', (err) => {
          console.error('Error in blobStream:', err);
          throw new Error('Error uploading file');
        });

        await new Promise((resolve, reject) => {
          blobStream.on('finish', resolve);
          blobStream.on('error', reject);
          blobStream.end(file.buffer);
        });

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
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

async function isDuplicateImage(newFile, existingFilePath) {
  const newFileHash = await generateFileHash(newFile.buffer);
  const existingFileHash = await generateFileHashFromURL(existingFilePath);
  console.log(newFileHash === existingFileHash);
  return newFileHash === existingFileHash;
}

async function generateFileHash(buffer) {
  const hash = crypto.createHash('md5');
  hash.update(buffer);
  return hash.digest('hex');
}

async function generateFileHashFromURL(url) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  return generateFileHash(buffer);
}

async function deleteFileFromGCS(filePath) {
  const fileName = filePath.split('/').pop();
  await bucket.file(fileName).delete();
}

module.exports = {
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
  updateUserData
};
