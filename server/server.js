// Express server setup
const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

// Enable CORS and BodyParser
app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'ruchamawilk@gmail.com' && password === '123') {
    // יצירת טוקן JWT
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' }); // הטוקן יפוג אחרי שעה
    res.json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// נתיב שמחזיר את הקטגוריות
app.get('/api', (req, res) => {
  const categories = [
    {
      pic: 'https://plus.unsplash.com/premium_photo-1695558759281-518eed6a6dda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM3fHhqUFI0aGxrQkdBfHxlbnwwfHx8fHw%3D',
      recipeName: 'Dinner',
    },
    {
      pic: 'https://plus.unsplash.com/premium_photo-1671647122910-3fa8ab4990cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwNnx4alBSNGhsa0JHQXx8ZW58MHx8fHx8',
      recipeName: 'Dessert',
    },
    {
      pic: 'https://plus.unsplash.com/premium_photo-1663858366999-aa1ce123a972?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDh8eGpQUjRobGtCR0F8fGVufDB8fHx8fA%3D%3D',
      recipeName: 'Breakfast',
    },
    {
      pic: 'https://plus.unsplash.com/premium_photo-1671647122910-3fa8ab4990cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwNnx4alBSNGhsa0JHQXx8ZW58MHx8fHx8',
      recipeName: 'Dessert',
    },
    {
      pic: 'https://plus.unsplash.com/premium_photo-1663858366999-aa1ce123a972?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDh8eGpQUjRobGtCR0F8fGVufDB8fHx8fA%3D%3D',
      recipeName: 'Breakfast',
    },
  ];
  res.json({ categories: categories });
});

// נתיב שמחזיר את המתכונים של קטגוריה מסוימת
app.get('/api/recipes/:categoryName', (req, res) => {
  const { categoryName } = req.params;

  // דוגמא למתכונים לכל קטגוריה
  const recipes = {
    Dinner: [
      { pic: 'https://media.istockphoto.com/id/907699948/photo/food.webp?a=1&s=612x612&w=0&k=20&c=UbY1xfTu82smDxaOONL2SOhEZGD6Mg6wi-59n0wMY2M=', recipeName: 'Lemon salmon' },
      { pic: 'https://plus.unsplash.com/premium_photo-1661777712373-9a9ee6e01007?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', recipeName: 'Grilled Chicken' }
    ],
    Dessert: [
      { pic: 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNha2V8ZW58MHx8MHx8fDA%3D', recipeName: 'Chocolate Cake' },
      { pic: 'https://plus.unsplash.com/premium_photo-1694336203192-c9e7f2891b95?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QXBwbGUlMjBQaWV8ZW58MHx8MHx8fDA%3D', recipeName: 'Apple Pie' }
    ],
    Breakfast: [
      { pic: 'https://plus.unsplash.com/premium_photo-1663854478296-dd00b6257021?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGFuY2FrZXN8ZW58MHx8MHx8fDA%3D', recipeName: 'Pancakes' },
      { pic: 'https://images.unsplash.com/photo-1668283653825-37b80f055b05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8T21lbGV0dGV8ZW58MHx8MHx8fDA%3D', recipeName: 'Omelette' }
    ],
  };

  if (recipes[categoryName]) {
    res.json({ recipes: recipes[categoryName] });
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

app.get('/api/recipeInstructions/:recipeName', (req, res) => {
  res.json("This will contain a recipe once I write the recipe in the DB");
});

// הפעלת השרת
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
