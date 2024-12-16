import { useNavigate } from 'react-router-dom';

import "./card.css"
const Card = ({ recipe})=>{
    const navigate = useNavigate();

    const showRecipe= ()=>{
        navigate(`/recipe/${recipe.recipeId}`);
    };
    return(
        <div className="card" onClick={showRecipe}>
            <img src={recipe.image} alt={recipe.name} className="card-img"/>
            <h2>{recipe.name}</h2>
            <div className="time">{recipe.avgTime} minutes</div>
        </div>
    );
};

export default Card;
