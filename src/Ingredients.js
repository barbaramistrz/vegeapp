import React from "react";


const Ingredients = (props) => {
  
    console.log(props);

    if(props.ingredients.ingredientList.length !== 0){
return <ul>
    {props.ingredients.ingredientList.map((ingredient, index) =>{
       return <li key={index}>{ingredient}</li>

    })}
</ul>
    }else{
        return <div>Click on the ingredients</div>
    }
};


export default Ingredients;
