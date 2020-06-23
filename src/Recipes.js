import React, { useState } from "react";
import Search from "./Search";
import Recipe from "./Recipe";
import { useHistory } from "react-router-dom";

const Recipes = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [searchedRecipe, setSearchedRecipe] = useState({ searched: null });

  const apiURL = "https://api.edamam.com/search?q=";
  const apiKeyId = "&app_key=c2ae1539336785970a35bb702f98f801&app_id=0cb5dc1b";
  const vegan = "&health=vegan&from=0&to=12";

  function setParams({ query = "" }) {
    const searchParams = new URLSearchParams();
    searchParams.set("query", query);
    return searchParams.toString();
  }

  let history = useHistory();

  const updateURL = (searchValue) => {
    const url = setParams({ query: searchValue });
    history.push(`?${url}`);
  };

  const search = (searchValue) => {
    setIsLoaded(false);
    setError(null);
    console.log(searchValue);
    setSearchedRecipe({ searched: searchValue });
    updateURL(searchValue);
    fetch(`${apiURL}${searchValue}${vegan}${apiKeyId}`)
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

  const mainIntro = (
    <div id="intro" className="pt-6 mb-6 pb-5 ">
    <div id="intro2" className="pt-6 pb-5 "></div>
    <h1 className="title has-text-centered pt-6">Vegan recipes finder</h1>
  </div>);
  
  const byline = (
  <div className="content has-text-centered">
  <p><strong>VEGE APP</strong> by <a href="https://github.com/barbaramistrz/" target="_blank" rel="noopener noreferrer">Basia Stolarz</a>.</p>
  <p>Recipe finder with <a href="https://developer.edamam.com/edamam-recipe-api">Edamam API</a>. Done with React, CSS with Bulma</p>
</div>)

  if (error) {
    document.getElementById("root").style.height = "100vh";
    document.body.style.backgroundImage =
      "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80";

    return (
      <div className="mt-4">
        Error: {error.message}
        <div className="mt-4">
          <Search search={search} />
        </div>
      </div>);
  } else if (!isLoaded) {
    document.getElementById("root").style.height = "100vh";
    document.body.style.backgroundImage =
      "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80";
    return (
      <div id="background" className="pb-6">
      {mainIntro}
      <div id="intro3" className="container pb-6">
    <Search search={search} />
     </div>
     {byline}
      </div>);
  } else {
    // document.body.style.removeProperty("background-image");
    // document.body.style.backgroundImage = 'https://images.unsplash.com/photo-1528459584353-5297db1a9c01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1075&q=80';
    console.log(recipes);
    if (recipes.length === 0) {
      document.getElementById("root").style.height = "100vh";
      return (
        <div id="background" className="pb-6">
        {mainIntro}    
        <div id="intro3" className="container pb-6">
            <Search search={search} />   
           <p className="has-text-centered">No recipes found! Try looking for something else.</p>
        </div>    
       {byline}
        </div>);
    } else {
      recipes.length >=4 ? document.getElementById("root").style.height = "100%": document.getElementById("root").style.height = "100vh";

      return (
        <div className="container">
          <Search search={search} />
          <div className="container mx-6 title has-text-centered">
            Delicious {searchedRecipe.searched} recipes
          </div>
          <div className="recipes  container columns is-multiline is-fluid box">
            {recipes.map((recipe, index) => {
              return <Recipe recipe={recipe} key={index} />;
            })}
          </div>
        </div>
      );
    }
  }
};

export default Recipes;
