import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Succes = ({ open, onClose, title, message, icon }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          minWidth: { xs: '80%', sm: '400px' },
          p: { xs: 2, sm: 3 },
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        {icon}
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: 'center' }}>
          {message}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default Succes;
