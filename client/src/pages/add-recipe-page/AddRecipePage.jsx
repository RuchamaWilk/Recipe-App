import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { addRecipe } from '../../services/apiService';

const AddRecipePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    avgTime: '',
    chefId: '',
    image: '',
    ingredients: [{ name: '', amount: '' }],
    instructions: [{ name: '' }],
    category: ''
  });
  const navigate = useNavigate();

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
    try {
      await addRecipe(formData);
      navigate('/');
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold', color: 'text.primary' }}>
          הוספת מתכון חדש
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 3,
            mb: 4
          }}>
            <Box sx={{ 
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' }
            }}>
              <TextField
                fullWidth
                label="שם המתכון"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
                dir="rtl"
              />
            </Box>
            <Box sx={{ 
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' }
            }}>
              <TextField
                fullWidth
                label="זמן הכנה"
                name="avgTime"
                value={formData.avgTime}
                onChange={handleChange}
                required
                variant="outlined"
                dir="rtl"
              />
            </Box>
            <Box sx={{ 
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' }
            }}>
              <TextField
                fullWidth
                label="קישור לתמונה"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                variant="outlined"
                dir="rtl"
              />
            </Box>
            <Box sx={{ 
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)' }
            }}>
              <TextField
                fullWidth
                label="קטגוריה"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                variant="outlined"
                dir="rtl"
              />
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}>
              מרכיבים
            </Typography>
            {formData.ingredients.map((ingredient, index) => (
              <Box key={index} sx={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: 2,
                mb: 2,
                alignItems: 'center'
              }}>
                <Box sx={{ 
                  flex: { xs: '1 1 100%', sm: '1 1 calc(45% - 8px)' }
                }}>
                  <TextField
                    fullWidth
                    label="שם המרכיב"
                    name="name"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, e)}
                    required
                    variant="outlined"
                    dir="rtl"
                  />
                </Box>
                <Box sx={{ 
                  flex: { xs: '1 1 100%', sm: '1 1 calc(45% - 8px)' }
                }}>
                  <TextField
                    fullWidth
                    label="כמות"
                    name="amount"
                    value={ingredient.amount}
                    onChange={(e) => handleIngredientChange(index, e)}
                    required
                    variant="outlined"
                    dir="rtl"
                  />
                </Box>
                <Box sx={{ 
                  flex: { xs: '1 1 100%', sm: 'initial' },
                  display: 'flex',
                  justifyContent: { xs: 'flex-start', sm: 'center' }
                }}>
                  <IconButton 
                    onClick={() => handleRemoveIngredient(index)}
                    color="error"
                    disabled={formData.ingredients.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddIngredient}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            >
              הוסף מרכיב
            </Button>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}>
              הוראות הכנה
            </Typography>
            {formData.instructions.map((instruction, index) => (
              <Box key={index} sx={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: 2,
                mb: 2,
                alignItems: 'flex-start'
              }}>
                <Box sx={{ 
                  flex: { xs: '1 1 100%', sm: '1 1 calc(90% - 8px)' }
                }}>
                  <TextField
                    fullWidth
                    label={`שלב ${index + 1}`}
                    name="name"
                    value={instruction.name}
                    onChange={(e) => handleInstructionChange(index, e)}
                    required
                    variant="outlined"
                    multiline
                    rows={2}
                    dir="rtl"
                  />
                </Box>
                <Box sx={{ 
                  flex: { xs: '1 1 100%', sm: 'initial' },
                  display: 'flex',
                  justifyContent: { xs: 'flex-start', sm: 'center' }
                }}>
                  <IconButton 
                    onClick={() => handleRemoveInstruction(index)}
                    color="error"
                    disabled={formData.instructions.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddInstruction}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            >
              הוסף שלב
            </Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              endIcon={<SendIcon />}
              sx={{
                px: 4,
                py: 1.5,
                backgroundColor: '#939185',
                '&:hover': {
                  backgroundColor: '#7a796f'
                }
              }}
            >
              שמור מתכון
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddRecipePage;