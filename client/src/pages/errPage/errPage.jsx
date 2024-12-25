import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrPage = (err= "404" ) => {

    const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

 const errDescreption  = err=== "400"? "Bad requrest, no such rout": "Page not found";
  const errNumber = err=== "400"? "400" : "404"
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
            {errDescreption}
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        {errNumber}
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist or has been moved.
      </Typography>
      <Button variant="contained" color="primary" onClick={goToHome}>
        Go to Home
      </Button>
    </Box>
  );
};

export default ErrPage;
