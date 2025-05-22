import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';
import { addRecipe, update } from '../services/apiService';

const useRecipeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    avgTime: '',
    chefId: '',
    image: '',
    ingredients: [{ name: '', amount: '' }],
    instructions: [{ name: '' }],
    category: ''
  });
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [imageError, setImageError] = useState('');
  
  const navigate = useNavigate();
  const { token, setUser, user } = useUser();
  const location = useLocation();
  const recipe = location.state?.recipe;

  // אתחול הטופס במצב עריכה
  useEffect(() => {
    if (recipe) {
      setIsEditMode(true);
      setFormData({
        name: recipe.name,
        avgTime: recipe.avgTime,
        chefId: recipe.chefId,
        image: recipe.image,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        category: recipe.category
      });
    }
  }, [recipe]);

  // וידוא תקינות כתובת התמונה
  useEffect(() => {
    if (formData.image) {
      if (!validateImageUrl(formData.image)) {
        setImageError('Please enter a valid URL');
      } else {
        setImageError('');
      }
    }
  }, [formData.image]);

  const validateImageUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'image') {
      setImageError('');
    }
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const newIngredients = formData.ingredients.map((ingredient, i) => 
      i === index ? { ...ingredient, [name]: value } : ingredient
    );
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleInstructionChange = (index, e) => {
    const { name, value } = e.target;
    const newInstructions = formData.instructions.map((instruction, i) => 
      i === index ? { ...instruction, [name]: value } : instruction
    );
    setFormData({ ...formData, instructions: newInstructions });
  };

  const handleAddIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, { name: '', amount: '' }] });
  };

  const handleAddInstruction = () => {
    setFormData({ ...formData, instructions: [...formData.instructions, { name: '' }] });
  };

  const handleRemoveIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData({ ...formData, ingredients: newIngredients });
    }
  };

  const handleRemoveInstruction = (index) => {
    if (formData.instructions.length > 1) {
      const newInstructions = formData.instructions.filter((_, i) => i !== index);
      setFormData({ ...formData, instructions: newInstructions });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.image && !validateImageUrl(formData.image)) {
      setImageError('Please enter a valid image URL');
      return;
    }
    
    try {
      if (isEditMode) {
        await update(recipe._id, formData, token);
        const updatedUser = { ...user };
        if (updatedUser.chefRecipes) {
          updatedUser.chefRecipes = updatedUser.chefRecipes.map(r => 
            r._id === recipe._id ? { ...r, ...formData } : r
          );
        }
        if (updatedUser.favoriteRecipes) {
          updatedUser.favoriteRecipes = updatedUser.favoriteRecipes.map(r => 
            r._id === recipe._id ? { ...r, ...formData } : r
          );
        }
        setUser(updatedUser);
      } else {
        const newRecipe = await addRecipe(formData, token);
        if (user._doc?.type === 'chef') {
          const updatedUser = { ...user };
          updatedUser.chefRecipes = [...(updatedUser.chefRecipes || []), newRecipe];
          setUser(updatedUser);
        }
      }
      setOpenSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } catch (error) {
      console.error('Error submitting recipe:', error);
    }
  };

  return {
    formData,
    isEditMode,
    imageError,
    openSuccess,
    handleChange,
    handleIngredientChange,
    handleInstructionChange,
    handleAddIngredient,
    handleRemoveIngredient,
    handleAddInstruction,
    handleRemoveInstruction,
    handleSubmit,
    setOpenSuccess
  };
};

export default useRecipeForm;