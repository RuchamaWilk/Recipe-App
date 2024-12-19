import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../../services/api'; // פונקציה שנוסיף כדי לשלוח את הנתונים לשרת
//import './addRecipePage.css';
import { Typography ,Box} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';



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
    <Box display="flex" flexDirection="column" alignItems="center"> 
      <Typography variant="h4" component="h1" gutterBottom>ADD RECIPE PAGE</Typography>
      <form onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Recipe Name" variant="outlined"
          /*placeholder="Enter Name of recipe"*/
           value={formData.name} 
           onChange= {handleChange} 
           required
           name= "name" />
        <br />
        <br />
        <TextField id="outlined-basic" label="Avg Time for Recipe" variant="outlined"
           value={formData.avgTime} 
           onChange= {handleChange} 
           required
           name= "avgTime" />
        <br />
        <br />
        <TextField id="outlined-basic" label="Recipe ID" variant="outlined"
           value={formData.recipeId} 
           onChange= {handleChange} 
           required
           name= "recipeId" />
        <br />
        <br />
        <TextField id="outlined-basic" label="chef Id" variant="outlined"
           value={formData.chefId} 
           onChange= {handleChange} 
           required
           name= "chefId" />
        <br />
        <br />
        <TextField id="outlined-basic" label="Upload Picture" variant="outlined"
           value={formData.image} 
           onChange= {handleChange} 
           required
           name= "image" />
        <br />
        <br />
        <TextField id="outlined-basic" label="Category" variant="outlined"
           value={formData.category} 
           onChange= {handleChange} 
           required
           name= "category" />
        <br />
        <br />
        <Typography variant="h5" component="h2" gutterBottom> INGREDIENTS</Typography>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index}>
              <TextField id="outlined-basic" label="Type Ingredient" variant="outlined"
            value={ingredient.name} 
            onChange={(e) => handleIngredientChange(index, e)} 
            required
            name= "name" />
            
            <TextField id="outlined-basic" label="Amount" variant="outlined"
            value={ingredient.amount} 
            onChange={(e) => handleIngredientChange(index, e)}
            required
            name= "amount" />
            <br />
            <br />
          </div>
        ))}
        
        <br />
        <Button variant="contained" size="large" onClick={handleAddIngredient} sx={{ backgroundColor: '#939185', color: '#fff', '&:hover': { backgroundColor: '#EEEDEB', color: '#939185' } }}>
        Add Ingredient
        </Button>
        <br />
        <br />
        <Typography variant="h5" component="h2" gutterBottom> INSTRUCTION</Typography>
        <br />
        {formData.instructions.map((instruction, index) => (
          <div key={index}>
              <TextField id="outlined-basic" label="Type Instruction" variant="outlined"
            value={instruction.name} 
            onChange={(e) => handleInstructionChange(index, e)} 
            required
            name= "name" />
            <br />
            <br />
          </div>
        ))}
        <Button variant="contained" size="large" onClick={handleAddInstruction} sx={{ backgroundColor: '#939185', color: '#fff', '&:hover': { backgroundColor: '#EEEDEB', color: '#939185' } }}>
        Add Instruction
        </Button>
        <br />
        <br />
        <Button variant="contained" endIcon={<SendIcon />} type="submit"  sx={{ backgroundColor: '#939185', color: '#fff', '&:hover': { backgroundColor: '#EEEDEB', color: '#939185' } }}>
          Add Recipe
        </Button>
      </form>
    </Box>
  );
};

export default AddRecipePage;
