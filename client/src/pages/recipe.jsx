import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../service/api';

export default function RecipePage() {
  const { recipeName } = useParams();
  const [recipe, setRecipe] = useState(null);

  const getRecipe = async () => {
    try {
      const data = await api.fetchRecipe(recipeName);
      setRecipe(data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  useEffect(() => {
    getRecipe();
  }, [recipeName]);

  return (
    <div>
      {recipe ? (
        <div>
            {recipe}
          <h1>{recipe.recipeName}</h1>
          <img src={recipe.pic} alt={recipe.recipeName} />
          <p>{recipe.description}</p>
          {/* ניתן להוסיף פרטים נוספים על המתכון כאן */}
        </div>
      ) : (
        <p>Loading recipe...</p>
      )}
    </div>
  );
}
