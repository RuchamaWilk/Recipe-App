// server.js
const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const app = express();
const connectDB = require('./config/db');



// Middleware
app.use(cors());
app.use(express.json());
//app.use(bodyParser.json());

const recipeRoutes = require('./routes/recipe');
app.use('/api', recipeRoutes);

const chefRoutes = require('./routes/chef');
app.use('/api/chef', chefRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
