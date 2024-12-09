import React from "react"
import "./categoryAndRecipeCard.css"

export default function CategoryAndRecipeCard(props){
    const {pic, recipeName}= props;
    return (
        <div className="category-card">
             <img src={pic} alt={recipeName}/>
             <p className="category-title">{recipeName}</p>
        </div>
    );
}

