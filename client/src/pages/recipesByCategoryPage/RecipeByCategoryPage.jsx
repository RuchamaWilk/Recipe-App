import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipesByCategory } from '../../services/api'; // ייבוא הפונקציה
import Card from '../../components/card/Card'
import './recipeByCategory.css'

const RecipeByCategory = () => {
  const { category } = useParams(); // הוצאת ה-ID מתוך ה-URL
  const [recipesByCategory, setRecipesByCategory] = useState(null); // שמירה במצב על המתכון

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipesByCategory(category); // קריאה ל-API
        setRecipesByCategory(fetchedRecipes); // עדכון המצב במתכון
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    getRecipes();
  }, [category]); // הפעלת useEffect כאשר ה-ID משתנה
  if (!recipesByCategory) {
    return <div>Loading...</div>;
  }
  const showRecipe= ()=>{
    navigate(`/recipe/${id}`);
    };
  return (
    <div className="recipesCategory" >
      <h1>{category}</h1>
            <div className="recipes-grid"  onClick={showRecipe}>
                { recipesByCategory.map((item, index) => (
                <Card key={index} recipe={item} />
                ))}
            </div>
    </div>
  );
};

export default RecipeByCategory;
