import React from 'react';
import Card from '../card/Card'
import { useNavigate } from 'react-router-dom';
import { Typography ,Box} from '@mui/material';
import { Button } from '@mui/material';
import CardActions from '@mui/material/CardActions';




const RowCategory = ({ category, recipes })=>{
    const navigate = useNavigate();
    const displayedCards = recipes.slice(0, 4);

    const showRecipes= ()=>{
        navigate(`/category/${category}`);
    };
    return(
        <div style={{ color: '#2F3645'  }} >
             <CardActions disableSpacing>  
             <Typography variant="h4" component="h1" gutterBottom>{category}</Typography>
            <Button sx={{color: '#939185'}}onClick={showRecipes} size="small">More</Button>

             </CardActions>
            
            <div style={{display: "flex",  justifyContent: "flex-start",gap: "20px"}}>
                { displayedCards.map((item, index) => (
                <Card key={index} recipe={item} />
                ))}
            </div>
            <Box sx={{ '& button': { m: 1 }  }}>
            
            </Box>
        </div>
    );
};

export default RowCategory;