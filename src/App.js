import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import useToggle from "./hooks/useToggle";

import Recipes from "./Recipes";
import RecipeDetail from "./RecipeDetail";
import Nav from "./Nav";

function App() {
  const [loggedin, setLoggedin] = useToggle(true);
  const [recipes, setRecipes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const { get, post, del } = useFetch(`/api/recipes`);

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

  const deleteRecipe = (recipeId) => {
    console.log("recipeId:", recipeId);
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
    <main>
      <BrowserRouter>
        <Nav setLoggedin={setLoggedin} loggedin={loggedin} />
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
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
