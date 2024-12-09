import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryAndRecipeCard from '../components/categoryAndRecipeCard';
import api from '../service/api';
import './homePage.css';

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const getRecipes = async () => {
    try {
      const data = await api.fetchRecipes(categoryName);
      setRecipes(data.recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  
  useEffect(() => {
    getRecipes();
  }, [categoryName]);

  const handleRecipeClick = (recipeName) => {
    navigate(`/recipe/${recipeName}`);
  };

  return (
    <div className="categories-container">
      <h1>{categoryName} Recipes</h1>
      <div>
        {recipes.length > 0 ? (
          <div className="categories-grid">
            {recipes.map((recipe, index) => (
              <div 
                key={index}
                onClick={() => handleRecipeClick(recipe.recipeName)}
              >
                <CategoryAndRecipeCard 
                  pic={recipe.pic} 
                  recipeName={recipe.recipeName} 
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No recipes found for this category.</p>
        )}
      </div>
    </div>
  );
}
