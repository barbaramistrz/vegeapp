import React, { useState } from "react";

const Recipe = ({ recipe, index }) => {
  const [ingredientsVisible, setIngredientsVisible] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleIngredients = () => {
    setIngredientsVisible(!ingredientsVisible);
  };
  
  const add= ()=>{
    let storedFavorites = JSON.parse(localStorage.getItem('favourites'))
    if(storedFavorites !== null){
    storedFavorites.push(recipe)
    localStorage.setItem('favourites', JSON.stringify(storedFavorites))
    }else{
    localStorage.setItem('favourites', JSON.stringify([recipe]))
  }};
 
  const remove= ()=>{
    let storedFavorites = JSON.parse(localStorage.getItem('favourites'));
    storedFavorites.splice(storedFavorites.findIndex(rec => rec.recipe.label === recipe.recipe.label), 1);
    localStorage.setItem('favourites', JSON.stringify(storedFavorites));
  };

  
  const  toggleFavourite = (e) => {
    e.preventDefault();
    setIsFavourite(!isFavourite);
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
    <a href="#" className="card-footer-item" onClick={(e) => toggleFavourite(e)}><span className="icon">
    {isFavourite? <img className="fa fa-home" onClick={()=>remove(recipe)} src="https://image.flaticon.com/icons/png/512/1077/1077086.png"/> : <img className="fa fa-home" onClick={()=>add()} src="https://image.flaticon.com/icons/png/512/1077/1077035.png"/>}
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
