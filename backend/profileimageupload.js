const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const schema = require('./Models/user.model');

const app = express();

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to upload profile image
app.post('/uploadProfileImage', upload.single('profileImage'), async (req, res) => {
  const { userId } = req.body;
  const profileImage = req.file;

  if (!userId || !profileImage) {
    return res.status(400).send({ msg: 'User ID and profile image are required' });
  }

  try {
    const user = await schema.findById(userId);
    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }

    user.profileImage = {
      data: profileImage.buffer,
      contentType: profileImage.mimetype,
    };

    await user.save();

    res.status(200).send({ msg: 'Profile image uploaded successfully' });

  } catch (error) {
    console.log("error", error);
    res.status(500).send({ msg: 'Server error' });
  }
});

module.exports = app;
