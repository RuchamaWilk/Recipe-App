import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryAndRecipeCard from '../components/categoryAndRecipeCard';
import api from '../service/api';
import './homePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const data = await api.fetchCategories();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/${categoryName}`);
  };

  return (
    <div className="categories-container">
      <h1>Categories</h1>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div key={index} onClick={() => handleCategoryClick(category.recipeName)}>
              <CategoryAndRecipeCard 
              pic={category.pic}
              recipeName={category.recipeName}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
