const random_recipe = document.getElementById("random-recipe");
const fav_meals = document.getElementById("slider");
const search_term = document.getElementById("search_txt");
const searchbtn = document.getElementById("search");

const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

getRandomMeal();
addMealFav();

async function getRandomMeal() {
  const randomMeal = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const responseData = await randomMeal.json();
  const respdata = responseData.meals[0];
  addmeal(respdata, true);
}

function addmeal(mealData, random = false) {
  const recipe = document.createElement("div");
  recipe.classList.add("recipe");
  recipe.innerHTML = `
    ${random ? `<span class="random-txt">Random Recipe</span>` : ""}
    <img
      src="${mealData.strMealThumb}"
      alt="${mealData.strMeal}"
    />
    <div class="img-footer">
      <h3>${mealData.strMeal}</h3>
      <i id = "hrt" class="fa-solid fa-heart fa-beat"></i>
    </div>
    `;
  recipe.addEventListener("click", () => {
    showMealInfo(mealData);
  });
  const heartIcon = recipe.querySelector(".fa-solid");
  let b = 0;
  heartIcon.addEventListener("click", () => {
    if (b) {
      removeMealLS(mealData.idMeal);
      heartIcon.style.color = "";
    } else {
      addMealLS(mealData.idMeal);
      heartIcon.style.color = "red";
    }
    b = ~b;
    addMealFav();
  });
  random_recipe.appendChild(recipe);
}

function addMealLS(mealId) {
  const mealIds = getMealLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}
function removeMealLS(mealId) {
  const mealIds = getMealLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}
function getMealLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

async function getMealbyId(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const responseData = await resp.json();
  const respdata = responseData.meals[0];
  return respdata;
}

async function addMealFav() {
  fav_meals.innerHTML = "";
  const mealIds = getMealLS();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    const meal = await getMealbyId(mealId);
    addtofav(meal);
  }
}

function addtofav(mealData) {
  const fav_meal = document.createElement("li");

  fav_meal.innerHTML = `
    <img
    src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"
      />
      <i class="fa-solid fa-heart fa-beat"></i>
      <span>${mealData.strMeal}</span>
     `;
  const heart1icon = random_recipe.querySelector(".fa-solid");
  const heartIcon = fav_meal.querySelector(".fa-solid");
  heartIcon.addEventListener("click", () => {
    heart1icon.style.color = "";
    removeMealLS(mealData.idMeal);
    addMealFav();
  });

  fav_meals.appendChild(fav_meal);
}

async function getMealbyterm(term) {
  const meal = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const responseData = await meal.json();
  const respdata = responseData.meals;
  return respdata;
}

searchbtn.addEventListener("click", async () => {
  const search = search_term.value;
  const meals = await getMealbyterm(search);
  random_recipe.innerHTML = "";
  if (meals) {
    meals.forEach((meal) => {
      addmeal(meal);
    });
  } else {
    random_recipe.innerHTML = `
    <div class= "recipe">
    <h5> No Recipe found with the current search Item </h5>
    <h6>Try Something else</h6>
    </div>
    `;
  }
});

function showMealInfo(mealData) {
  // clean it up
  mealInfoEl.innerHTML = "";

  const mealEl = document.createElement("div");

  const ingredients = [];

  // get ingredients and measures
  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }

  mealEl.innerHTML = `
  <h1>${mealData.strMeal}</h1>
  <img
  src="${mealData.strMealThumb}"
  alt="${mealData.strMeal}"
  />
  <p>
  ${mealData.strInstructions}
  </p>
  <h3>Ingredients:</h3>
  <ul>
  ${ingredients
    .map(
      (ing) => `
        <li>${ing}</li>
        `
    )
    .join("")}
    </ul>
    `;

  mealInfoEl.appendChild(mealEl);

  mealPopup.classList.remove("hidden");
}

popupCloseBtn.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});
