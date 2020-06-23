import React, { useState} from "react";
import Recipe from "./Recipe";

const FavouriteRecipes = () => {
const recipes = JSON.parse(localStorage.getItem("favourites"))
recipes.length >=4 ? document.getElementById("root").style.height = "100%": document.getElementById("root").style.height = "100vh";


  return <div className="container ">
<div className="recipes container columns is-multiline is-fluid box mt-4">
          {recipes.map((recipe, index) => {
            return <Recipe recipe={recipe} key={index} />;
          })}
        </div>  </div>

 }


export default FavouriteRecipes;
