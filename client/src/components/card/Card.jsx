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

const Card = ({ recipe})=>{
    const navigate = useNavigate();

    const showRecipe= ()=>{
        navigate(`/recipe/${recipe.recipeId}`);
    };

    return(
        <CardUi>
            <CardHeader
                avatar={ <Avatar sx={{ bgcolor: "#E6B9A6" }} aria-label="recipe"></Avatar>}
                action={<IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>}
                title={recipe.name}
                subheader={`${recipe.avgTime} minutes`}
                />
            <CardMedia onClick= {showRecipe} component="img" height="200" image= {recipe.image} alt= {recipe.name}/>
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    All about {recipe.name}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>    
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
