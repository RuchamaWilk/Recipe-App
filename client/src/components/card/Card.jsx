import CardUi from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

const Card = ({ recipe }) => {
    const navigate = useNavigate();

    const showRecipe = () => {
        navigate(`/recipe/${recipe.recipeId}`);
    };

    return (
        <CardUi sx={{
                width: 320, height: 200, display: 'flex', flexDirection: 'column',
                position: 'relative', 
                cursor: 'pointer',
                transition: 'all 0.3s ease', 
                '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)', 
                transform: 'scale(1.05)', 
              }, }}>
            <CardMedia
                onClick={showRecipe}
                component="img"
                sx={{ height: '66%' }}
                image={recipe.image}
                alt={recipe.name}
            />
            <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column',justifyContent: 'space-between', padding: '8px 16px' }}>
                <div>
                    <Typography variant="h6" noWrap>{recipe.name}</Typography>
                    <Typography /*variant="body2"*/ color="text.secondary">
                        {`${recipe.avgTime} Min`}
                    </Typography>
                </div>
            </CardContent>
            <CardActions disableSpacing sx={{ position: 'absolute', bottom: 8, right: 8, padding: 0 ,gap: 1}}>
                <IconButton aria-label="add to favorites" sx={{ padding: 0, fontSize: 'small' }}>
                    <FavoriteIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="share" sx={{ padding: 0, fontSize: 'small' }}>
                    <ShareIcon fontSize="small" />
                </IconButton>
            </CardActions>
        </CardUi>
    );
};

Card.propTypes = {
    recipe: PropTypes.shape({
      recipeId: PropTypes.string.isRequired,  // מזהה המתכון (במספר)
      image: PropTypes.string.isRequired,     // כתובת התמונה (מחרוזת)
      name: PropTypes.string.isRequired,      // שם המתכון (מחרוזת)
      avgTime: PropTypes.number.isRequired,  // זמן ממוצע ב-Min (מספר)
    }).isRequired, // שדה recipe חייב להיות תמיד
  
  };
  
export default Card;
