//server/routs/chef.js
const express = require('express');
const router = express.Router();
const Chef = require('../models/chef');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
      console.log("trying to fetch");
      const chefs = await Chef.find();
      console.log("why?", chefs);
      res.json(chefs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("router",email )
    try {
      const chef = await Chef.findOne({emaiAdress: email} );
      console.log("router now",chef)
      if (!chef) {
        return res.status(400).json({ success: false, message: 'User not found' });
      }
      console.log("chef.password " ,chef.password)
      console.log("password " ,password)
      if(password!==chef.password){
        console.log("):")
        return res.status(400).json({ success: false, message: 'Invalid password' });
      }
      console.log("got to here!")
      res.json({ success: true, message: 'Login successful' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  module.exports = router;

