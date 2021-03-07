import React, { useState, useEffect } from "react";
import Search from "./Search";
import Recipe from "./Recipe";
import { useHistory } from "react-router-dom";

const Recipes = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [searchedRecipe, setSearchedRecipe] = useState({ searched: null });
  const [isLoading, setIsLoading] = useState(false);

  const apiURL = "https://api.edamam.com/search?q=";
  const apiKeyId = "&app_key=c2ae1539336785970a35bb702f98f801&app_id=0cb5dc1b";
  const vegan = "&health=vegan&diet=balanced&from=0&to=12";

  function setParams({ query = "" }) {
    const searchParams = new URLSearchParams();
    searchParams.set("query", query);
    return searchParams.toString();
  }

  function getParams(location) {
    const searchParams = new URLSearchParams(location.search);
    return {
      query: searchParams.get('query') || '',
    };
  }
  let history = useHistory();
  const { query } = getParams(window.location);


  const updateURL = (searchValue) => {
    const url = setParams({ query: searchValue });
    history.push(`?${url}`);
  };

  useEffect(()=>{if (query !== ""){
    search(query)}}, [])

  const search = (searchValue) => {
    setIsLoaded(false)
    setIsLoading(true)
    setError(null)

    setSearchedRecipe({ searched: searchValue });
    updateURL(searchValue);
    fetch(`${apiURL}${searchValue}${vegan}${apiKeyId}`)
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setIsLoading(false);
          setRecipes(result.hits);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          setIsLoading(false);

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
   
    return (
      <div className="mt-4">
        Error: {error.message}
        <div className="mt-4">
          <Search search={search} />
        </div>
      </div>);

  } else if (!isLoaded && !isLoading) {
    document.getElementById("root").style.height = "100vh";
   
    return (
      <div className="pb-6">
      {mainIntro}
      <div id="intro3" className="container pb-6">
    <Search search={search} />
     </div>
     {byline}
      </div>);

  } else if(isLoading) {
    return (
      <div className="container">
        <Search search={search} />
        <div className="container mx-6 title has-text-centered">
        {`Searching for delicious ${searchedRecipe.searched} recipes...`}  
        </div>
        <div className="recipes  container columns is-multiline is-fluid box">
          {recipes.map((recipe, index) => {
            return <Recipe recipe={recipe} key={index} />;
          })}
        </div>
      </div>
    );} else{
    console.log(recipes);
    if (recipes.length === 0) {
      document.getElementById("root").style.height = "100vh";
      return (
        <div  className="pb-6">
        {mainIntro}    
        <div id="intro3" className="container pb-6">
            <Search search={search} />   
           <p className="has-text-centered">No recipes found! Try looking for something else.</p>
        </div>    
       {byline}
        </div>);

    } else {
      recipes.length >=4 ? document.getElementById("root").style.height = "100%": document.getElementById("root").style.height = "100vh";
      console.log(isLoading)
      return (
        <div className="container">
          <Search search={search} />
          <div className="container mx-6 title has-text-centered">
          {`Delicious ${searchedRecipe.searched} recipes`}  
          </div>
          <div className="recipes container columns is-multiline is-3 is-fluid box">
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
