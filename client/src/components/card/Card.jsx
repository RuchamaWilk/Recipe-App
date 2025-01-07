import CardUi from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';


const Card = ({ recipe }) => {
    const navigate = useNavigate();

    const showRecipe = () => {
        navigate(`/recipe/${recipe._id}`);
    };

    return (
        <CardUi sx={{
            border: "1px solid #ada6a7",
            width: 320, height: 200, display: 'flex', flexDirection: 'column',
            position: 'relative',
            borderRadius: "12px",
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backgroundColor: '#ebebeb',
            '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: "4px solid black"
            },
        }}>
            <CardMedia
                component="img"
                image={recipe.image}
                alt={recipe.name}
                sx={{ height: '60%' }}
            />
            <CardActions disableSpacing sx={{position: 'absolute', margin: "-10px"}}>
                <IconButton  sx={{ color: 'transparent',stroke: 'white',
                    '&:hover': {transform: 'scale(1.05)',color: "red", stroke: 'red'},}}>
                    <FavoriteIcon fontSize="large"  />
                </IconButton>
            </CardActions>
            <CardContent onClick={showRecipe} sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2px 4px' }}>
                <div>
                    <Typography variant="h6" noWrap>{recipe.name}</Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 0.70, paddingTop: "4px" }}>
                        {`${recipe.avgTime} Min | Difficulty: ? | Chef: ${recipe.chefId}`}
                    </Typography>
                    <Rating name="no-value" value={3} readOnly  sx= {{paddingBlock: "2px",fontSize: "1.1rem", paddingTop: "8px"}}/>

                    
                </div>
            </CardContent>
        </CardUi>
    );
};

Card.propTypes = {
    recipe: PropTypes.shape({
        image: PropTypes.string.isRequired,     // כתובת התמונה (מחרוזת)
        name: PropTypes.string.isRequired,      // שם המתכון (מחרוזת)
        avgTime: PropTypes.number.isRequired,  // זמן ממוצע ב-Min (מספר)
        chefId: PropTypes.string.isRequired
    }).isRequired, // שדה recipe חייב להיות תמיד
};

export default Card;
