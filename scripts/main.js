// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://127.0.0.1:${
  import.meta && import.meta.env && import.meta.env.REACT_APP_JSON_SERVER_PORT
    ? import.meta.env.REACT_APP_JSON_SERVER_PORT
    : 9090
}`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
let mainSection = document.getElementById("data-list-wrapper");
let getRecipesBtn = document.getElementById("fetch-recipes");
let totalResult = document.querySelector(".total-results");
const urlAllRecipes = `${baseServerURL}/recipes`;

let recipesArray = [];
    
let currentPage = 1;
const limit = 5;
let isLoading = false;

getRecipesBtn.addEventListener("click", fetchRecipes);
window.addEventListener("scroll", handleScroll);

function fetchRecipes() {
  if (isLoading) return;

  isLoading = true;
  fetch(`${urlAllRecipes}?_page=${currentPage}&_limit=${limit}`)
    .then((response) => response.json())
    .then((data) => {
      renderRecipes(data);
      currentPage++;
      isLoading = false;
      updateTotalResults();
    })
    .catch((error) => {
      console.error("Error fetching recipes:", error);
      isLoading = false;
    });
}

function renderRecipes(recipes) {
  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
      <div>
        <img src="${recipe.image}" alt="${recipe.name}">
      </div>
      <div class="recipe-details">
        <h2 class="recipe-name">${recipe.name}</h2>
        <p class="recipe-price">$${recipe.price}</p>
      </div>
    `;

    mainSection.appendChild(recipeCard);
  });
}



function handleScroll() {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    !isLoading
  ) {
    fetchRecipes();
  }
}

function updateTotalResults() {
  const total = document.querySelectorAll(".recipe-card").length;
  totalResult.textContent = total;
}