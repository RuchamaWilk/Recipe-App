import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, TextField, Button, Paper, IconButton, Divider, useTheme, useMediaQuery } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ImageIcon from '@mui/icons-material/Image';
import { addRecipe, update } from '../../services/apiService';
import TimedAleart from '../../components/timed-aleart/TimedAleart';
import { useUser } from '../../providers/UserProvider';
import { useLocation } from 'react-router-dom';

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [imageError, setImageError] = useState('');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { token, setUser, user } = useUser();

  const location = useLocation();
  const recipe = location.state?.recipe;

  useEffect(() => {
    if (recipe) {
      setIsEditMode(true);
      const fetchRecipe = async () => {
        try {
          setFormData({
            name: recipe.name,
            avgTime: recipe.avgTime,
            chefId: recipe.chefId,
            image: recipe.image,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            category: recipe.category
          });
        } catch (error) {
          console.error('Error fetching recipe details:', error);
        }
      };
      fetchRecipe();
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear image error when user starts typing a new URL
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

  const validateImageUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  // Check image URL automatically when it changes
  useEffect(() => {
    if (formData.image) {
      if (!validateImageUrl(formData.image)) {
        setImageError('Please enter a valid URL');
      } else {
        setImageError('');
      }
    }
  }, [formData.image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate image URL before submission
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

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 }, mx: { xs: -2, sm: 0 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: { xs: 2, sm: 4 } }}>
          <RestaurantIcon sx={{ fontSize: { xs: 50, sm: 75 }, color: '#939185', mb: 2 }} />
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', color: 'text.primary', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            {isEditMode ? 'Edit Recipe' : 'Add New Recipe'}
          </Typography>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: { xs: 2, sm: 3 },
            mb: { xs: 3, sm: 4 }
          }}>
            <TextField
              fullWidth
              label="Add a New Recipe"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              variant="outlined"
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              label="Preparation Time"
              name="avgTime"
              value={formData.avgTime}
              onChange={handleChange}
              required
              variant="outlined"
              size={isMobile ? "small" : "medium"}
            />
            <Box sx={{ gridColumn: { xs: '1', sm: '1 / 3' } }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                p: 3,
                border: '1px dashed #ccc',
                borderRadius: '4px',
                backgroundColor: '#f9f9f9'
              }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  Recipe Image
                </Typography>
                
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    error={!!imageError}
                    helperText={imageError}
                    placeholder="https://example.com/your-image.jpg"
                  />
                </Box>
                
                {formData.image ? (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    width: '100%',
                    mt: 2
                  }}>
                    <img 
                      src={formData.image} 
                      alt="Recipe preview" 
                      onError={() => setImageError('Invalid image URL or image cannot be loaded')}
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '200px', 
                        objectFit: 'contain',
                        borderRadius: '4px'
                      }} 
                    />
                  </Box>
                ) : (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100px'
                  }}>
                    <ImageIcon sx={{ fontSize: 60, color: '#939185', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      Enter an image URL above
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              variant="outlined"
              size={isMobile ? "small" : "medium"}
            />
          </Box>

          <Divider sx={{ my: { xs: 2, sm: 4 } }} />
          
          <Box sx={{ mb: { xs: 2, sm: 4 } }}>
            <Typography variant="h5" sx={{ 
              mb: 2, 
              fontWeight: 'bold', 
              color: 'text.primary',
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}>
              Ingredients
            </Typography>
            {formData.ingredients.map((ingredient, index) => (
              <Box key={index} sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: { xs: 1, sm: 2 },
                mb: 2
              }}>
                <TextField
                  sx={{ flex: 1 }}
                  label="Ingredient Name"
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                  variant="outlined"
                  size={isMobile ? "small" : "medium"}
                />
                <TextField
                  sx={{ flex: 1 }}
                  label="Amount"
                  name="amount"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                  variant="outlined"
                  size={isMobile ? "small" : "medium"}
                />
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1,
                  mt: { xs: 1, sm: 0 }
                }}>
                  <IconButton
                    onClick={() => handleRemoveIngredient(index)}
                    color="error"
                    disabled={formData.ingredients.length === 1}
                    size={isMobile ? "small" : "medium"}
                  >
                    <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
                  </IconButton>
                  {index === formData.ingredients.length - 1 && (
                    <IconButton
                      onClick={handleAddIngredient}
                      color="primary"
                      size={isMobile ? "small" : "medium"}
                    >
                      <AddIcon fontSize={isMobile ? "small" : "medium"} />
                    </IconButton>
                  )}
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ mb: { xs: 2, sm: 4 } }}>
            <Typography variant="h5" sx={{ 
              mb: 2, 
              fontWeight: 'bold', 
              color: 'text.primary',
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}>
              Instructions
            </Typography>
            {formData.instructions.map((instruction, index) => (
              <Box key={index} sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'flex-start',
                gap: { xs: 1, sm: 2 },
                mb: 2
              }}>
                <TextField
                  sx={{ flex: 1 }}
                  label={`Step ${index + 1}`}
                  name="name"
                  value={instruction.name}
                  onChange={(e) => handleInstructionChange(index, e)}
                  required
                  variant="outlined"
                  multiline
                  rows={2}
                  size={isMobile ? "small" : "medium"}
                />
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1,
                  justifyContent: 'flex-end',
                  mt: { xs: 1, sm: 0 }
                }}>
                  <IconButton
                    onClick={() => handleRemoveInstruction(index)}
                    color="error"
                    disabled={formData.instructions.length === 1}
                    size={isMobile ? "small" : "medium"}
                  >
                    <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
                  </IconButton>
                  {index === formData.instructions.length - 1 && (
                    <IconButton
                      onClick={handleAddInstruction}
                      color="primary"
                      size={isMobile ? "small" : "medium"}
                    >
                      <AddIcon fontSize={isMobile ? "small" : "medium"} />
                    </IconButton>
                  )}
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: { xs: 2, sm: 4 }
          }}>
            <Button
              type="submit"
              variant="contained"
              size={isMobile ? "medium" : "large"}
              endIcon={<SendIcon />}
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                backgroundColor: '#939185',
                '&:hover': {
                  backgroundColor: '#7a796f'
                }
              }}
            >
              Save Recipe
            </Button>
          </Box>
        </form>
      </Paper>
      <TimedAleart
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        title={isEditMode ? 'Recipe Updated Successfully!' : 'Recipe Added Successfully!'}
        message={isEditMode ? 'Your recipe has been updated!' : 'Your recipe has been added!'}
        icon={<CheckCircleIcon color="success" fontSize="large" />}
      />
    </Container>
  );
};

export default AddRecipePage;