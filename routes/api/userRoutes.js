const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};


router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, middleInit, lastName, dob, phone } = req.body;

    console.log('Received data:', { username, email, password }); // DEBUG

    // required input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide username, email, and password' });
    }

    //  user already exists?
    const userExists = await User.findOne({ 
      $or: [
        { username: username },
        { 'reminderInfo.email': email }
      ]
    });
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this username or email' });
    }

    const newUser = new User({
      username: username,
      password: password,
      identity: {
        firstName: firstName || '',
        middleInit: middleInit || '',
        lastName: lastName || '',
        dob: dob || null
      },
      reminderInfo: {
        email: email,
        phone: phone || ''
      }
    });

    console.log('New user object:', newUser); 
    const savedUser = await newUser.save();

    console.log('User saved:', savedUser); 

    res.status(201).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.reminderInfo.email,
      token: generateToken(savedUser._id)
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt - Email:', email); // DEBUG

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ 'reminderInfo.email': email });

    console.log('User found:', user ? 'YES' : 'NO'); 
    if (user) {
      console.log('Stored email:', user.reminderInfo.email); 
      console.log('Hashed password:', user.password); 
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log('Password match:', isMatch); 

    if (isMatch) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.reminderInfo.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

module.exports = router;