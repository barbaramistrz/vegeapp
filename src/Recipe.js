import React, { useEffect, useState } from "react";

const Recipe = ({ recipe, index }) => {
  const [ingredientsVisible, setIngredientsVisible] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const checkIfFavourite = () => {
    if (localStorage.getItem("favourites") !== null) {
      let storedFavorites = JSON.parse(localStorage.getItem("favourites"));
      let recipefavourite = storedFavorites.find(
        (rec) => rec.recipe.label === recipe.recipe.label
      );
      recipefavourite !== undefined
        ? setIsFavourite(true)
        : setIsFavourite(false);
    }
  };

  const toggleIngredients = () => {
    setIngredientsVisible(!ingredientsVisible);
  };

  const add = () => {
    if (localStorage.getItem("favourites") !== null) {
      let storedFavorites = JSON.parse(localStorage.getItem("favourites"));

      if (storedFavorites.length >= 1) {
        storedFavorites.push(recipe);
        localStorage.setItem("favourites", JSON.stringify(storedFavorites));
        console.log(storedFavorites);
      } else {
        localStorage.setItem("favourites", JSON.stringify([recipe]));
      }
    } else {
      localStorage.setItem("favourites", JSON.stringify([recipe]));
    }
  };

  const remove = () => {
    let storedFavorites = JSON.parse(localStorage.getItem("favourites"));
    storedFavorites.splice(
      storedFavorites.findIndex(
        (rec) => rec.recipe.label === recipe.recipe.label
      ),
      1
    );
    localStorage.setItem("favourites", JSON.stringify(storedFavorites));
  };

  const toggleFavourite = (e) => {
    e.preventDefault();
    setIsFavourite(!isFavourite);
    isFavourite ? remove() : add();
  };

  useEffect(() => checkIfFavourite(), []);

  return (
    <div
      id={`recipe${index}`}
      key={index}
      className="column box  my-1 has-text-centered is-one-third">
      <img
        src={recipe.recipe.image}
        alt={recipe.recipe.label}
        max-height="150px"
        className="card-image is-inline-block"
      />
      <div className="card-content ">
        <p className="title is-5">{recipe.recipe.label}</p>
      </div>
      <footer className="card-footer">
        <a
          href="#"
          className="card-footer-item"
          onClick={(e) => toggleFavourite(e)}>
          <span className="icon">
            {isFavourite ? (
              <img
                className="fa fa-home"
                src="https://image.flaticon.com/icons/png/512/1077/1077086.png"
              />
            ) : (
              <img
                className="fa fa-home"
                src="https://image.flaticon.com/icons/png/512/1077/1077035.png"
              />
            )}
          </span>
        </a>
        <a
          href={recipe.recipe.url}
          target="_blank"
          className="card-footer-item">
          Recipe
        </a>
        <a onClick={() => toggleIngredients()} className="card-footer-item">
          Ingredients
        </a>
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
