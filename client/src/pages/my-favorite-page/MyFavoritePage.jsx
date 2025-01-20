
import React from 'react';
import RecipesPage from '../../pages/recipes-grid-page/RecipesGridPage';
import { fetchFavoriteRecipes } from '../../services/apiService';
import { useUser } from '../../providers/UserProvider';
import { useEffect, useState } from 'react';


const MyFavoritePage = () => {
  const { user, token } = useUser();
  const [favoriteRecipes, setFavoriteRecipes] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (user) {
          const recipes = await fetchFavoriteRecipes(user._id,token);
          setFavoriteRecipes(recipes);
        }
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
        setFavoriteRecipes([]); 
      }
    };
    fetchFavorites();
  }, [user]);

  return <RecipesPage recipes={favoriteRecipes} isFavorite={true} />;


};

export default MyFavoritePage;
