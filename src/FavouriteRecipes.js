import React from "react";
import Recipe from "./Recipe";

const FavouriteRecipes = () => {
  if (JSON.parse(localStorage.getItem("favourites")) === null){
    localStorage.setItem('favourites', JSON.stringify([]));

  }
  const recipes = JSON.parse(localStorage.getItem("favourites"));
  recipes.length >= 4
    ? (document.getElementById("root").style.height = "100%")
    : (document.getElementById("root").style.height = "100vh");

  return (
    <div className="container ">
      {recipes.length < 1 ? (
        <div className="recipes container columns is-multiline is-fluid box mt-4">
          Click the heart button to choose your favourites!
        </div>
      ) : (
        <div className="recipes container columns is-multiline is-fluid box mt-4">
          {recipes.map((recipe, index) => {
            return <Recipe recipe={recipe} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default FavouriteRecipes;
