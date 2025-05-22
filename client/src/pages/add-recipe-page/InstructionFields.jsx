import React from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const InstructionFields = ({ 
  instructions, 
  handleInstructionChange, 
  handleAddInstruction, 
  handleRemoveInstruction,
  isMobile 
}) => {
  return (
    <Box sx={{ mb: { xs: 2, sm: 4 } }}>
      <Typography variant="h5" sx={{ 
        mb: 2, 
        fontWeight: 'bold', 
        color: 'text.primary',
        fontSize: { xs: '1.25rem', sm: '1.5rem' }
      }}>
        Instructions
      </Typography>
      {instructions.map((instruction, index) => (
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
              disabled={instructions.length === 1}
              size={isMobile ? "small" : "medium"}
            >
              <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
            {index === instructions.length - 1 && (
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
  );
};

export default InstructionFields;