import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipesById } from '../../services/api'; // ייבוא הפונקציה
import './recipeIn.css'

const RecipeIn = () => {
  const { id } = useParams(); // הוצאת ה-ID מתוך ה-URL
  const [recipe, setRecipe] = useState(null); // שמירה במצב על המתכון

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const fetchedRecipe = await fetchRecipesById(id); // קריאה ל-API
        setRecipe(fetchedRecipe); // עדכון המצב במתכון
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    getRecipes();
  }, [id]); // הפעלת useEffect כאשר ה-ID משתנה

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe">
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} className="card-img" />
      <h2>Ingredients:</h2>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item.amount} {item.name}</li>
        ))}
      </ul>
      <h2>Instructions:</h2>
      <ul>
        {recipe.instructions.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeIn;
