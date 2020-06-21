
import React, { useState } from "react";
import Search from "./Search";
import Recipe from "./Recipe";

const Recipes = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [searchedRecipe, setSearchedRecipe] = useState({ searched: null });
  const [favourites, setFavourites] = useState({ favouriteRecipes: [null] });

  const apiURL = "https://api.edamam.com/search?q=";
  const apiKey = "&app_key=c2ae1539336785970a35bb702f98f801";
  const apiId = "&app_id=0cb5dc1b";
  const veganDinner = "&health=vegan&diet=balanced&from=0&to=12";


  const search = (searchValue) => {
    setIsLoaded(false);
    setError(null);
    console.log(searchValue);
    setSearchedRecipe({ searched: searchValue });
    // document.getElementById("body").style.removeProperty("background-image");

    fetch(`${apiURL}${searchValue}${veganDinner}${apiId}${apiKey}`)
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRecipes(result.hits);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
//   const addToFavourites = (results) => {
// setFavourites({favouriteRecipes: [ results]})
//   console.log(favourites)

// }

  if (error) {
    return (
      <div className="mt-4">
        Error: {error.message}
        <div className="mt-4">
          <Search search={search} />
        </div>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div id="background" className="pb-6">
        <div id="intro" className="pt-6 mb-6 pb-5 ">
          <div id="intro2" className="pt-6 pb-5 "></div>
          <h1 className="title has-text-centered pt-6">Vegan recipes finder</h1>
        </div>
        <div id="intro3" className="container pb-6">
          <Search search={search} />
        </div>
        <div className="content has-text-centered">
          <p><strong>VEGE APP</strong> by <a href="https://github.com/barbaramistrz/" target="_blank" rel="noopener noreferrer" >Basia Stolarz</a>.</p>
          <p>Recipe finder with <a href="https://developer.edamam.com/edamam-recipe-api">Edamam API</a>. Done with React, CSS with Bulma</p>
        </div>
      </div>
    );
  } else {
    console.log(recipes);
    return (
      <div className="container">
        <Search search={search} />
        <div className="container mx-6 title has-text-centered">
          Delicious {searchedRecipe.searched} recipes
        </div>
        <div className="recipes px-6 py-6 container columns is-multiline is-fluid box">
          {recipes.map((recipe, index) => {
            return <Recipe recipe={recipe} key={index}
            //  callbackFromParent={addToFavourites()}
             />;
          })}
        </div>
      </div>
    );
  }
};

export default Recipes;
