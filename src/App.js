import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import useToggle from "./hooks/useToggle";

import Recipes from "./Recipes";
import RecipeDetail from "./RecipeDetail";
import Nav from "./Nav";

const reducer = (state, action) => {
  switch (action) {
    case "on":
      return true;
    case "off":
      return false;
    default:
      return state;
  }
};

function App() {
  const [loggedin, setLoggedin] = useToggle(true);
  const [recipes, setRecipes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { get, post, del, put } = useFetch(`/api/recipes`);
  const [light, dispatch] = React.useReducer(reducer, true);

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    setLoading(true);
    get("/api/recipes")
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => setError(error));
  }, []);

  const addRecipe = (recipe) => {
    post("/api/recipes", recipe).then((data) => {
      setRecipes([data, ...recipes]);
    });
  };

  const editRecipe = (updatedRecipe) => {
    console.log(updatedRecipe);
    put(`/api/recipes/${updatedRecipe._id}`, updatedRecipe).then(
      get("/api/recipes").then((data) => {
        setRecipes(data);
      })
    );
  };

  const deleteRecipe = (recipeId) => {
    del(`/api/recipes/${recipeId}`)
      .then(
        setRecipes((recipes) =>
          recipes.filter((recipe) => recipe._id !== recipe.recipeId)
        )
      )
      .then(
        get("/api/recipes").then((data) => {
          setRecipes(data);
        })
      );
  };

  if (loading === true) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className={light ? "lit" : "unlit"}>
      <BrowserRouter>
        <Nav setLoggedin={setLoggedin} loggedin={loggedin} />
        <button onClick={() => dispatch("on")}>Light</button>
        <button onClick={() => dispatch("off")}>Dark</button>
        <Routes>
          <Route
            path="/"
            element={
              <Recipes
                recipes={recipes}
                loggedin={loggedin}
                addRecipe={addRecipe}
              />
            }
          />
          <Route
            path="/:recipeId"
            element={
              <RecipeDetail
                recipes={recipes}
                deleteRecipe={deleteRecipe}
                loggedin={loggedin}
                editRecipe={editRecipe}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
