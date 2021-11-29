import React from "react";
import { Link, useParams } from "react-router-dom";

import FormEditRecipe from "./FormEditRecipe";

function RecipeDetail({ recipes, loggedin, deleteRecipe, editRecipe }) {
  const { recipeId } = useParams();
  const [recipeDeleted, setRecipeDeleted] = React.useState(false);

  const currRecipe = recipes.filter((recipe) => recipe._id === recipeId);
  const thisRecipe = { ...currRecipe[0] };

  const delRecipe = () => {
    deleteRecipe(thisRecipe._id);
    setRecipeDeleted(true);
  };

  if (recipeDeleted) {
    return (
      <>
        <p>Recipe deleted!</p>
        <Link to="/">Home</Link>
      </>
    );
  }

  return (
    <div>
      <FormEditRecipe thisRecipe={thisRecipe} editRecipe={editRecipe} />
      <img src={`/img/${thisRecipe.image}`} alt={thisRecipe.title} />
      <h1>{thisRecipe.title}</h1>
      <p>{thisRecipe.description}</p>

      {loggedin && <button onClick={() => delRecipe()}>delete</button>}

      <Link to="/">Home</Link>
    </div>
  );
}

export default RecipeDetail;
