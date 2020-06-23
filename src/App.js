import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "./App.sass";
import Home from "./Home";
import Recipes from "./Recipes"
import Error from "./Error";
import FavouriteRecipes from './FavouriteRecipes';
import Nav from "./Nav";


const App = () =>{

  return(
    <>
    <BrowserRouter>   

    <Nav />
    <section>
      <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route  path="/about" component={Recipes} /> */}
      {/* <Route  path="/contact" component={Contact} /> */}
      <Route  path="/recipes" component={FavouriteRecipes} />
      <Route path="/?search=:searchValue"  component={Recipes} />

      <Route component={Error} />
      </Switch>
    </section>


  </BrowserRouter>
    </>
  )
}

export default App;
