import React, { useState } from "react";

const Recipe = ({ recipe, index }) => {
  const [ingredientsVisible, setIngredientsVisible] = useState(false);

  const toggleIngredients = () => {
    setIngredientsVisible(!ingredientsVisible);
  };
 
  return (
    <div id={`recipe${index}`} key={index} className="column card mx-1 my-1">
      <img
        src={recipe.recipe.image}
        alt={recipe.recipe.label}
        max-height="150px"
        className="card-image"
      />
      <div className="card-content">
        <p className="title is-5">{recipe.recipe.label}</p>  </div>
        <footer className="card-footer">
    <a href="#" className="card-footer-item">Save</a>
    <a href={recipe.recipe.url} target="_blank" className="card-footer-item">Recipe</a>
    <a onClick={() => toggleIngredients()} className="card-footer-item">Ingredients</a>         

  </footer>
      
        <ul className={ingredientsVisible ? null : "is-hidden"}>
          {recipe.recipe.ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient.text}</li>;
          })}
        </ul>

    
    </div>
  );
};

export default Recipe;
