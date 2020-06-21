import React, { useState, useEffect } from "react";

const Recipe = ({ recipe, index, addToFavourites }) => {
  const [ingredientsVisible, setIngredientsVisible] = useState(false);
  const [favourite, setFavourite] = useState(false);

  const toggleIngredients = () => {
    setIngredientsVisible(!ingredientsVisible);
  };
 
  const toggleFavourite = (e) => {
    e.preventDefault();
    setFavourite(!favourite);  
    // console.log(addToFavourites)
  };
  //  useEffect(() =>{
  //     if(favourite){addToFavourites(recipe)};

  //   }, [favourite])
  
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
    <a href="#" className="card-footer-item" onClick={(e) => toggleFavourite(e)}><span className="icon">
    {favourite? <img className="fa fa-home" src="https://image.flaticon.com/icons/png/512/1077/1077086.png"/> : <img className="fa fa-home" src="https://image.flaticon.com/icons/png/512/1077/1077035.png"/>}
    </span>
    </a>
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
