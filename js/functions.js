
let items = JSON.parse(localStorage.getItem("items")) || [];

/* =========================
   SAVE ITEMS
========================= */

function saveItems() {
  localStorage.setItem("items", JSON.stringify(items));
}

/* =========================
   SEARCH FOOD FROM API
========================= */
const API_KEY = "YOUR API KEY HERE";

async function searchFood() {
  const query = document.getElementById("search").value.trim();
  const resultsDiv = document.getElementById("results");

  if (!query) {
    alert("Search food by name");
    return;
  }

  resultsDiv.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=5&api_key=${API_KEY}`
    );

    if (!res.ok) throw new Error("API error");

    const data = await res.json();
    resultsDiv.innerHTML = "";

    if (!data.foods || data.foods.length === 0) {
      resultsDiv.innerHTML = "<p>No results found</p>";
      return;
    }

    data.foods.forEach(food => {
      const name = food.description;

      // etsitään kalorit
     const nutrients = food.foodNutrients;

function getNutrient(name) {
  const n = nutrients.find(n => n.nutrientName === name);
  return n ? n.value : null;
}

const kcal = getNutrient("Energy");
const protein = getNutrient("Protein");
const carbs = getNutrient("Carbohydrate, by difference");
const fat = getNutrient("Total lipid (fat)");
const fiber = getNutrient("Fiber, total dietary");

if (!kcal) return;

const div = document.createElement("div");
div.className = "result";

div.innerHTML = `
  <b>${food.description}</b><br>
   ${kcal} kcal / 100g<br>
   Proteiini: ${protein ?? "-"} g<br>
   Hiilihydraatit: ${carbs ?? "-"} g<br>
   Rasva: ${fat ?? "-"} g<br>
   Kuitu: ${fiber ?? "-"} g<br>
  <button onclick="addFood('${food.description.replace(/'/g,"")}', ${kcal})">
    Lisää
  </button>
`;

      div.innerHTML = `
        <b>${name}</b><br>
        ${kcal} kcal / 100g<br>
        <button onclick="addFood(
  '${food.description.replace(/'/g,"")}',
  ${kcal},
  ${protein ?? 0},
  ${carbs ?? 0},
  ${fat ?? 0},
  ${fiber ?? 0}
)">
Lisää
</button>
      `;

      resultsDiv.appendChild(div);
    });

  } catch (err) {
    resultsDiv.innerHTML = "<p>Error searching for food</p>";
    console.error(err);
  }
}

/* =========================
   ADD FOOD
========================= */

function addFood(name, kcalPer100g, protein, carbs, fat, fiber) {
  const amount = parseFloat(document.getElementById("amount").value);

  if (!amount || amount <= 0) {
    alert("Please enter an amount");
    return;
  }

  const factor = amount / 100;

  items.push({
    name,
    amount,
    calories: kcalPer100g * factor,
    protein: protein ? protein * factor : 0,
    carbs: carbs ? carbs * factor : 0,
    fat: fat ? fat * factor : 0,
    fiber: fiber ? fiber * factor : 0,
    date: new Date().toLocaleDateString()
  });

  saveItems();
  alert("Added!");
}

/* =========================
   HISTORY PAGE
========================= */

function renderHistory() {
  const list = document.getElementById("list");

  if (!list) return;

  list.innerHTML = "";

  items.forEach((item, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <b>${item.name}</b> (${item.amount}g)<br>
         ${item.calories.toFixed(0)} kcal |
         ${(item.protein ?? 0).toFixed(1)} g |
         ${(item.carbs ?? 0).toFixed(1)} g |
         ${(item.fat ?? 0).toFixed(1)} g |
         ${(item.fiber ?? 0).toFixed(1)} g
      </div>
      <button class="delete-btn" onclick="removeItem(${i})">X</button>
    `;

    list.appendChild(li);
  });
}

function removeItem(index) {
  items.splice(index, 1);
  saveItems();
  renderHistory();
}

/* =========================
   STATS-PAGE
========================= */

function renderStats() {
  const totalEl = document.getElementById("total");
  const avgEl = document.getElementById("avg");
  const maxEl = document.getElementById("max");
  const goalEl = document.getElementById("goal");

  const proteinEl = document.getElementById("protein");
  const carbsEl = document.getElementById("carbs");
  const fatEl = document.getElementById("fat");
  const fiberEl = document.getElementById("fiber");

  if (!totalEl) return;

  let total = 0;
  let max = null;

  let proteinTotal = 0;
  let carbsTotal = 0;
  let fatTotal = 0;
  let fiberTotal = 0;

  items.forEach(item => {
    total += item.calories || 0;

    proteinTotal += item.protein || 0;
    carbsTotal += item.carbs || 0;
    fatTotal += item.fat || 0;
    fiberTotal += item.fiber || 0;

    if (!max || item.calories > max.calories) {
      max = item;
    }
  });

  const avg = items.length ? total / items.length : 0;
  const goal = 2000;

  // kcal
  totalEl.textContent = "Total: " + total.toFixed(0) + " kcal";
  avgEl.textContent = "Average: " + avg.toFixed(0) + " kcal";
  maxEl.textContent = max ? "Largest serving: " + max.name : "No data";

  goalEl.textContent =
    total > goal
      ? "Goal exceeded (" + goal + " kcal)"
      : "Remaining: " + (goal - total).toFixed(0) + " kcal";

  // nutrients
  proteinEl.textContent = "Protein: " + proteinTotal.toFixed(1) + " g";
  carbsEl.textContent = "Carbohydrates: " + carbsTotal.toFixed(1) + " g";
  fatEl.textContent = "Fat: " + fatTotal.toFixed(1) + " g";
  fiberEl.textContent = "Fiber: " + fiberTotal.toFixed(1) + " g";
}