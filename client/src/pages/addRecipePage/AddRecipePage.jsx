import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../../services/api'; // פונקציה שנוסיף כדי לשלוח את הנתונים לשרת
import './addRecipePage.css';

const AddRecipePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    avgTime: '',
    recipeId: '',
    chefId: '',
    image: '',
    ingredients: [{ name: '', amount: '' }],
    instructions: [{ name: '' }],
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("nice", formData)
      await addRecipe(formData); // קריאה לפונקציה שתשלח את הנתונים לשרת
      navigate('/'); // ניתוב חזרה לדף הבית לאחר ההוספה
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div className= 'add-recipe-page'>
      <h1>Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>Avg Time:
          <input type="number" name="avgTime" value={formData.avgTime} onChange={handleChange} required />
        </label>
        <label>Recipe ID:
          <input type="text" name="recipeId" value={formData.recipeId} onChange={handleChange} required />
        </label>
        <label>Chef ID:
          <input type="text" name="chefId" value={formData.chefId} onChange={handleChange} required />
        </label>
        <label>Image URL:
          <input type="text" name="image" value={formData.image} onChange={handleChange} required />
        </label>
        <label>Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </label>
        <h2>Ingredients:</h2>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index}>
            <label>Name:
              <input type="text" name="name" value={ingredient.name} onChange={(e) => handleIngredientChange(index, e)} required />
            </label>
            <label>Amount:
              <input type="text" name="amount" value={ingredient.amount} onChange={(e) => handleIngredientChange(index, e)} required />
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
        <h2>Instructions:</h2>
        {formData.instructions.map((instruction, index) => (
          <div key={index}>
            <label>Step:
              <input type="text" name="name" value={instruction.name} onChange={(e) => handleInstructionChange(index, e)} required />
            </label>
          </div>
        ))}
        <button type="button" onClick={handleAddInstruction}>Add Instruction</button>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipePage;
