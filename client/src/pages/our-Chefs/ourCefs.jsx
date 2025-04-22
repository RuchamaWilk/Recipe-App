import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  CircularProgress,
  Box,
  Container,
} from '@mui/material';
import { fetchChefs } from '../../services/apiService';

const OurChefs = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChef, setSelectedChef] = useState(null);

  useEffect(() => {
    const getChefs = async () => {
      try {
        const data = await fetchChefs();
        setChefs(data.filter((chef) => chef.type === 'chef'));
      } catch (err) {
        console.error('Error fetching chefs:', err);
      } finally {
        setLoading(false);
      }
    };

    getChefs();
  }, []);

  if (loading) {
    return <CircularProgress sx={{ color: '#577657', margin: 'auto', display: 'block', mt: 4 }} />;
  }

  return (
    <Box sx={{ 
      padding: { xs: '20px', md: '40px' }, 
      backgroundColor: '#F6E6E4', 
      minHeight: '100vh' 
    }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ 
          color: '#577657', 
          fontWeight: 'bold', 
          mb: 4, 
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: 2
        }}>
          Culinary Artists
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {chefs.map((chef) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={chef._id}>
              <Card sx={{ 
                borderRadius: '12px', 
                transition: 'transform 0.3s', 
                '&:hover': { transform: 'scale(1.03)' },
                backgroundColor: 'white',
                height: '100%',
                maxWidth: '280px',
                margin: '0 auto'
              }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={chef.profileImage || 'https://via.placeholder.com/200'}
                  alt={chef.userName}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h6" sx={{ color: '#CA8A8B', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {chef.userName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#577657', fontSize: '0.9rem' }}>
                    {chef.yearsOfExperience} years of experience
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      mt: 1.5,
                      backgroundColor: '#577657',
                      '&:hover': { backgroundColor: '#465d46' },
                      color: 'white',
                      borderRadius: '20px',
                      px: 2,
                      py: 0.5,
                      fontSize: '0.8rem'
                    }}
                    onClick={() => setSelectedChef(chef)}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {selectedChef && (
        <Dialog
          open={Boolean(selectedChef)}
          onClose={() => setSelectedChef(null)}
          maxWidth="sm"
          fullWidth
          PaperProps={{ 
            sx: { 
              borderRadius: '16px',
              maxHeight: '80vh' // Limit dialog height to enable scrolling
            }
          }}
          scroll="paper" // Important: This enables proper scrolling behavior
        >
          <DialogTitle sx={{ 
            backgroundColor: '#ffbcb3', 
            color: '#577657', 
            fontWeight: 'bold',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            py: 1.5,
            px: 2,
            position: 'sticky', // Keep title visible while scrolling
            top: 0,
            zIndex: 1
          }}>
            Chef Profile: {selectedChef.userName}
          </DialogTitle>
          <DialogContent 
            dividers // Adds dividers between title, content and actions
            sx={{ 
              backgroundColor: '#F6E6E4', 
              padding: '16px',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#CA8A8B',
                borderRadius: '4px',
              }
            }}
          >
            <Box sx={{ overflow: 'auto' }}>
              <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs={12} sm={4} display="flex" justifyContent="center">
                  <Avatar
                    alt={selectedChef.userName}
                    src={selectedChef.profileImage}
                    sx={{ 
                      width: { xs: 100, sm: 100 }, 
                      height: { xs: 100, sm: 100 }, 
                      border: '2px solid #CA8A8B',
                      mb: { xs: 2, sm: 0 }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="body1" sx={{ color: '#577657', mb: 1, fontSize: '0.9rem' }}>
                    <strong>Email:</strong> {selectedChef.emailAddress}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#577657', mb: 1, fontSize: '0.9rem' }}>
                    <strong>Phone:</strong> {selectedChef.phoneNumber}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#577657', mb: 1, fontSize: '0.9rem' }}>
                    <strong>Experience:</strong> {selectedChef.yearsOfExperience} years
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#577657', mt: 2, fontSize: '0.9rem' }}>
                    <strong>About Me:</strong> {selectedChef.aboutMe || `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac ligula vel diam scelerisque fringilla. Praesent commodo, justo id venenatis fermentum, justo dui lobortis nisi, id condimentum odio metus eu eros. Suspendisse potenti. Curabitur sit amet purus ut elit elementum cursus. Aenean a justo non arcu porta auctor. Ut semper, justo vitae consectetur laoreet, libero nibh consequat libero, a pulvinar risus nisl nec risus. Mauris id hendrerit sem. Nunc vel tortor ultricies, commodo dui a, elementum magna. Praesent tempor dui ut risus ultrices, id varius justo eleifend. Nullam at ligula non dui molestie placerat. Aenean bibendum ultricies convallis. Suspendisse non consequat ipsum, vel semper arcu. Donec imperdiet lorem at magna tristique, in varius leo elementum. Ut vehicula, turpis vel aliquet efficitur, sapien magna viverra ligula, vel facilisis odio sem at dui.`}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ 
            backgroundColor: '#F6E6E4', 
            padding: '12px',
            position: 'sticky', // Keep actions visible while scrolling
            bottom: 0,
            zIndex: 1
          }}>
            <Button 
              onClick={() => setSelectedChef(null)}
              sx={{ 
                color: '#577657', 
                '&:hover': { backgroundColor: '#ffbcb3' } 
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default OurChefs;