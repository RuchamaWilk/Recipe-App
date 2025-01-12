// client/src/pages/homePage/HomePage.jsx
import React, { useEffect, useState } from 'react';
import RowCategory from '../../components/row-category/RowCategory';
import { fetchRecipes } from '../../services/apiService';


const HomePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const recipes = await fetchRecipes();
        console.log("recipes: ",recipes);
        const grouped = recipes.reduce((acc, recipe) => {
            const { category } = recipe;
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(recipe);
            console.log(acc);
            return acc;
          }, {});
        setCategories(grouped);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getRecipes();
  }, []);

  console.log("categories: " ,categories)
  return (
    <div >
        {Object.keys(categories).map((category, index) => (
        <RowCategory  key={index} category={category} recipes={categories[category]}/* sx={{gap: "15px"}}*/ />
      ))}
     
    </div>
  );
};

export default HomePage;
