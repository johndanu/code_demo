const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const models = require('../models');
console.log(models); // check what keys you have, probably 'user' not 'User'
const User = models.user;

const generateToken = (user, secret, expiresIn) =>
  jwt.sign({ id: user.id }, secret, { expiresIn });

const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ first_name: req.body.first_name,last_name:req.body.last_name,  email: req.body.email,password: hashedPassword });
    res.status(201).json({ message: 'User registered', user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

     const isMatch = await bcrypt.compare(req.body.password, user.password);
   
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const accessToken = generateToken(user, process.env.ACCESS_SECRET, '15m');
    const refreshToken = generateToken(user, process.env.REFRESH_SECRET, '7d');

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  login,
  register
};
