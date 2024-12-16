import React from 'react';
import Card from '../card/Card'
import './rowCategory.css'
import { useNavigate } from 'react-router-dom';



const RowCategory = ({ category, recipes })=>{
    const navigate = useNavigate();
    const displayedCards = recipes.slice(0, 4);

    const showRecipes= ()=>{
        navigate(`/category/${category}`);
    };
    return(
        <div >
            <h1> {category}</h1>
            <div className="card-container">
                { displayedCards.map((item, index) => (
                <Card key={index} recipe={item} />
                ))}
            </div>
            <p onClick={showRecipes}> More</p>
        </div>
    );
};

export default RowCategory;