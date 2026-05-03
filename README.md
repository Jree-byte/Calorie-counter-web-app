# 🍎 Calorie Counter Web App

A simple calorie tracking web application built with HTML, CSS, and JavaScript.  
The app allows users to search foods, view nutritional values, and track daily intake.

---

## 🚀 Features

- 🔍 Search foods using real nutritional data API  
- 🍽 Add foods with custom portion size (grams)  
- 🔥 Automatic calorie calculation  
- 🥩 Displays macronutrients:
  - Protein
  - Carbohydrates
  - Fat
  - Fiber  
- 📊 Statistics page with totals and daily summary  
- 💾 Saves data in browser using localStorage  
- 🌐 Multi-page navigation (Index / History / Stats)

---

## 🌐 Data Source

This project uses the **USDA FoodData Central API**  
👉 https://fdc.nal.usda.gov/

The API provides real nutritional information for thousands of foods.

---

## 🧠 How it works

1. User searches for a food item  
2. App fetches data from USDA API  
3. User selects a food and enters amount in grams  
4. Calories and nutrients are calculated automatically  
5. Data is stored in localStorage  
6. Stats page summarizes daily intake  

---

## 🛠 Technologies used

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Fetch API
- localStorage
- USDA FoodData Central API

---
## 📂 Project structure

```text
repo/
│
├── index.html
├── history.html
├── stats.html
├── README.md
│
├── css/
│   └── style.css
│
└── js/
    └── functions.js
## ⚙️ Setup

1. Clone repository:git clone https://github.com/Jree-byte/Calorie-counter-web-app
Open index.html in browser
Or deploy using GitHub Pages
🔑 API Key Note

This project uses the USDA API.

API key is required
Key is used in functions.js
In production, it should be stored in a backend or environment variable
🌍 Live demo

👉 https://Jree-byte.github.io/Calorie-counter-web-app/

📊 Future improvements
📈 Graphs for macronutrients (Chart.js)
🔎 Autocomplete search
🌙 Dark mode
📅 Day-by-day tracking
📱 Mobile optimization
👨‍💻 Author

Student project for web development course.

📄 License

Free to use for educational purposes.
