import React, { useState, useEffect } from 'react';
import { Box, Typography, Link, Container, Grid, Card, CardContent, Divider, useTheme, useMediaQuery, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SignUp from '../../components/sign-up/SignUp';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ExploreIcon from '@mui/icons-material/Explore';
import ChefHatIcon from '@mui/icons-material/Restaurant'; // Using Restaurant as substitute for ChefHat
import FavoriteIcon from '@mui/icons-material/Favorite';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EmailIcon from '@mui/icons-material/Email';
import { motion } from 'framer-motion'; // Note: You'll need to install framer-motion

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const AboutUs = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleOpenSignUp = () => {
    setShowSignUp(true);
  };

  const handleCloseSignUp = () => {
    setShowSignUp(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const featureCards = [
    {
      title: "Discover Unique Recipes",
      description: "Explore our curated collection of dishes from passionate creators around the world, from easy weeknight meals to impressive culinary adventures.",
      icon: <ExploreIcon sx={{ fontSize: 40, color: '#CA8A8B' }} />
    },
    {
      title: "Share Your Creations",
      description: "Join as a chef and share your signature recipes with food enthusiasts who appreciate authentic, creative cuisine.",
      icon: <ChefHatIcon sx={{ fontSize: 40, color: '#CA8A8B' }} />,
      isChef: true
    },
    {
      title: "Build Your Collection",
      description: "Save your favorite recipes in personalized collections and access them anytime, anywhere to recreate your favorite dishes.",
      icon: <FavoriteIcon sx={{ fontSize: 40, color: '#CA8A8B' }} />,
      isSignUp: true
    },
    {
      title: "Get Smart Recommendations",
      description: "Our AI-powered insights help you elevate flavors, discover ingredient substitutes, and refine techniques for exceptional results.",
      icon: <LightbulbIcon sx={{ fontSize: 40, color: '#CA8A8B' }} />
    },
    {
      title: "Connect With Us",
      description: "Have questions or suggestions? We'd love to hear from you! Reach out to our team for any culinary guidance or platform feedback.",
      icon: <EmailIcon sx={{ fontSize: 40, color: '#CA8A8B' }} />,
      email: "ruchamawilk@gmail.com"
    }
  ];

  const parallaxOffset = scrollPosition * 0.3;

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #f6f8fa 0%, #f2f0f9 100%)',
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(202,138,139,0.1) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 0,
          transform: `translateY(${parallaxOffset}px)`
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '-5%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(87,118,87,0.1) 0%, rgba(255,255,255,0) 70%)',
          zIndex: 0,
          transform: `translateY(-${parallaxOffset}px)`
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          sx={{ mb: 8, textAlign: 'center' }}
        >
          <Typography 
            component="h1" 
            variant="h2" 
            sx={{ 
              fontWeight: 700, 
              color: '#577657',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              letterSpacing: '-0.5px'
            }}
          >
            About Our<br />
            <Typography 
              component="span" 
              variant="h2" 
              sx={{ 
                fontWeight: 700, 
                color: '#CA8A8B',
                fontSize: 'inherit',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: '10%',
                  width: '80%',
                  height: '4px',
                  background: 'linear-gradient(90deg, rgba(202,138,139,0) 0%, rgba(202,138,139,1) 50%, rgba(202,138,139,0) 100%)',
                  borderRadius: '2px'
                }
              }}
            >
              Culinary Community
            </Typography>
          </Typography>
          
          <MotionTypography 
            variant="h6" 
            sx={{ 
              color: '#666', 
              maxWidth: '800px', 
              mx: 'auto', 
              mt: 4,
              lineHeight: 1.8,
              fontWeight: 400
            }}
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            A vibrant space where food enthusiasts unite to discover, create, and share culinary inspiration from around the world.
          </MotionTypography>
        </MotionBox>

        {/* Main content section */}
        <MotionBox
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          sx={{ mt: 8 }}
        >
          {/* Increased spacing from 3 to 6 to prevent cards from overlapping */}
          <Grid container spacing={3}>
            {featureCards.map((card, index) => (
              <Grid item xs={12} md={6} lg={4} key={index} sx={{ mb: 4 }}>
                <MotionCard
                  variants={cardVariants}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
                    transition: { duration: 0.3 }
                  }}
                  sx={{
                    borderRadius: '16px',
                    height: '100%',
                    p: 3,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 60,
                        height: 60,
                        borderRadius: '12px',
                        background: 'rgba(202, 138, 139, 0.1)',
                        mr: 2
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.25rem',
                        color: '#444',
                        flexGrow: 1
                      }}
                    >
                      {card.title}
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#666',
                      mb: 3,
                      flexGrow: 1,
                      lineHeight: 1.7
                    }}
                  >
                    {card.description}
                  </Typography>

                  {card.isChef && (
                    <RouterLink to="/chef-sign-up" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          borderColor: '#CA8A8B',
                          color: '#CA8A8B',
                          borderRadius: '10px',
                          textTransform: 'none',
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          padding: '10px 16px',
                          height: '44px',
                          minWidth: '160px',
                          '&:hover': {
                            borderColor: '#CA8A8B',
                            backgroundColor: 'rgba(202, 138, 139, 0.1)'
                          }
                        }}
                      >
                        Join as a Chef
                      </Button>
                    </RouterLink>
                  )}

                  {card.isSignUp && (
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleOpenSignUp}
                      sx={{
                        backgroundColor: '#CA8A8B',
                        color: 'white',
                        borderRadius: '10px',
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        padding: '10px 16px',
                        height: '44px',
                        minWidth: '160px',
                        boxShadow: '0 4px 10px rgba(202, 138, 139, 0.3)',
                        '&:hover': {
                          backgroundColor: '#b67879'
                        }
                      }}
                    >
                      Sign Up Now
                    </Button>
                  )}

                  {card.email && (
                    <Link 
                      href={`mailto:${card.email}`}
                      sx={{
                        color: '#577657',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 500,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      <EmailIcon sx={{ fontSize: 18, mr: 1 }} />
                      {card.email}
                    </Link>
                  )}
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </MotionBox>

        {/* Inspirational quote */}
        <MotionBox
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          sx={{
            my: 10,
            p: 5,
            borderRadius: '20px',
            backgroundColor: 'rgba(87, 118, 87, 0.05)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              left: -20,
              fontFamily: 'Georgia, serif',
              fontSize: '160px',
              color: 'rgba(202, 138, 139, 0.1)',
              lineHeight: 1
            }}
          >
            "
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontStyle: 'italic',
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 500,
              color: '#577657',
              mb: 3,
              position: 'relative',
              zIndex: 1
            }}
          >
People who love to eat are always the best people          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: '#CA8A8B',
              fontWeight: 600
            }}
          >
            —  Julia Child
          </Typography>
        </MotionBox>

        {/* Call to action */}
        <MotionBox
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          sx={{
            mt: 6,
            mb: 4,
            textAlign: 'center'
          }}
        >
          <Button
            variant="contained"
            onClick={handleOpenSignUp}
            sx={{
              backgroundColor: '#577657',
              color: 'white',
              borderRadius: '30px',
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              padding: '12px 30px',
              boxShadow: '0 4px 20px rgba(87, 118, 87, 0.3)',
              '&:hover': {
                backgroundColor: '#486446',
                boxShadow: '0 6px 25px rgba(87, 118, 87, 0.4)',
              }
            }}
            startIcon={<RestaurantIcon />}
          >
            Join Our Community Today
          </Button>
          <Typography
            variant="body2"
            sx={{
              color: '#666',
              mt: 2,
              fontSize: '0.9rem'
            }}
          >
            Start your culinary journey with us — it's free!
          </Typography>
        </MotionBox>
      </Container>
      
      {/* SignUp dialog */}
      <SignUp 
        open={showSignUp} 
        onClose={handleCloseSignUp} 
      />
    </Box>
  );
};

export default AboutUs;