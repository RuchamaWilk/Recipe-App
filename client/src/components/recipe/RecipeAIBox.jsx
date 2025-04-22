import React, { useState, useEffect } from "react";
import { Paper, Typography, CircularProgress, Box, Chip } from "@mui/material";
import { EmojiObjects, Refresh } from "@mui/icons-material";
import PropTypes from "prop-types";
import { GoogleGenerativeAI } from "@google/generative-ai";

const RecipeAIBox = ({ name, ingredients, instructions }) => {
  const [suggestion, setSuggestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tipCounter, setTipCounter] = useState(0); // Counter to ensure diversity

  const API_KEY = "AIzaSyCZPVbvtueGLrjFj4RmepWihUO__da5W3I"; // Replace with your actual API key!

  const fetchAISuggestion = async () => {
    if (!name || ingredients.length === 0) return;

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const ingredientList = ingredients.map(ing => ing.name).join(", ");
      const instructionList = instructions.map(ins => ins.name).join(", ");
      
      // Increment counter for diverse tips
      const newCounter = tipCounter + 1;
      setTipCounter(newCounter);
      
      // Use different prompts to ensure diversity of tips
      let promptVariation;
      
      switch (newCounter % 5) {
        case 0:
          promptVariation = "Focus on texture and mouthfeel techniques";
          break;
        case 1:
          promptVariation = "Focus on aroma and presentation techniques";
          break;
        case 2:
          promptVariation = "Focus on flavor-enhancing techniques";
          break;
        case 3:
          promptVariation = "Focus on time-saving or efficiency techniques";
          break;
        case 4:
        default:
          promptVariation = "Focus on professional chef secrets";
          break;
      }
      
      const result = await model.generateContent({
        contents: [{
          role: "user",
          parts: [{
            text: `I want you to give me exactly 3-4 short recommendations to improve my recipe without changing it completely. 
            Each tip should be no more than one sentence.
            Do not replace ingredients, adjust quantities, or significantly modify the preparation steps. 
            ${promptVariation} that would improve this specific recipe.
            
            IMPORTANT: Generate completely different tips from what you might have suggested before.
            Make sure these tips are unique and not repetitive of common cooking advice.
            
            Here are the recipe details:
            Recipe name: ${name}
            Ingredient list: ${ingredientList}
            Instructions: ${instructionList}
            
            Format your response as a bullet list with just 3-4 very short tips.
            
            Generate batch #${newCounter} of tips.`
          }]
        }]
      });

      const text = result.response.text();
      // Process the tips to extract clean tips
      let cleanTips = text
        .split(/\n/)
        .filter(line => line.trim().startsWith('*') || line.trim().startsWith('-'))
        .map(tip => tip.replace(/^\s*[\*\-]\s*/, '').trim())
        .filter(tip => tip !== '');
        
      // Limit to max 4 tips
      cleanTips = cleanTips.slice(0, 4);
      
      setSuggestion(cleanTips);
    } catch (error) {
      console.error("AI Error:", error);
      setSuggestion(["Failed to load AI suggestion."]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchAISuggestion();
  }, [name, ingredients, instructions]);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        mt: 4, 
        p: 3, 
        borderRadius: 2, 
        bgcolor: "#FFFAF6", 
        border: "1px solid #E6B9A6",
        position: "relative"
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3, 
          display: "flex", 
          alignItems: "center", 
          gap: 1, 
          color: "#B25E45", 
          fontWeight: 600,
          borderBottom: "2px solid #E6B9A6",
          pb: 1
        }}
      >
        <EmojiObjects sx={{ color: "#E6B9A6" }} />
        Chef's Quick Tips
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <CircularProgress size={24} sx={{ color: "#E6B9A6" }} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {suggestion.map((tip, index) => (
            <Box 
              key={index} 
              sx={{ 
                flex: "1 1 45%",
                minWidth: "200px",
                bgcolor: "#FFF", 
                p: 2, 
                borderRadius: 2,
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                borderTop: "3px solid #E6B9A6"
              }}
            >
              <Typography 
                variant="body1" 
                sx={{ 
                  color: "#555",
                  fontStyle: "italic"
                }}
              >
                {tip}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      
      <Chip 
        icon={<Refresh fontSize="small" />}
        label="New Tips" 
        size="small" 
        onClick={fetchAISuggestion}
        sx={{ 
          mt: 2,
          bgcolor: "#E6B9A6", 
          color: "#FFF",
          fontSize: "0.7rem",
          cursor: "pointer",
          '&:hover': {
            bgcolor: "#D9A796",
          },
          transition: "background-color 0.3s"
        }} 
      />
    </Paper>
  );
};

RecipeAIBox.propTypes = {
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  instructions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeAIBox;