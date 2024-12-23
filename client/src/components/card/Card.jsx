import CardUi from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ recipe }) => {
    const navigate = useNavigate();

    const showRecipe = () => {
        navigate(`/recipe/${recipe.recipeId}`);
    };

    return (
        <CardUi sx={{ width: 300, height: 200, display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                onClick={showRecipe}
                component="img"
                sx={{ height: '66%' }} // 2/3 of the card height
                image={recipe.image}
                alt={recipe.name}
            />
            <CardContent sx={{ flex: '1 0 auto', padding: 1 }}>
                <Typography variant="h6" noWrap>{recipe.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {`${recipe.avgTime} minutes`}
                </Typography>
                
            </CardContent>
            <CardActions disableSpacing sx={{ justifyContent: 'space-between', padding: 1 }}>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </CardUi>
    );
};

export default Card;
