import { items, saveItems } from './storage.js'

const searchInput = document.querySelector('#search')
const amountInput = document.querySelector('#amount')
const resultsDiv = document.querySelector('#results')
const searchButton = document.querySelector('#search-btn')

const API_KEY = 'YOUR_API_KEY_HERE' 

const getNutrient = (nutrients, name) => {
    const n = nutrients.find(x => x.nutrientName === name)
    return n ? n.value : 0
}

const addFood = (name, calories, protein, carbs, fat, fiber) => {

    const amount = parseFloat(amountInput.value)

    if(!amount || amount <= 0) {
        alert('Enter grams')
        return
    }

    const factor = amount / 100

    items.push({
        name,
        amount,
        calories: calories * factor,
        protein: protein * factor,
        carbs: carbs * factor,
        fat: fat * factor,
        fiber: fiber * factor,
        date: new Date().toLocaleDateString()
    })

    saveItems()
    alert('Added')
}

const searchFood = async () => {

    const query = searchInput.value.trim()

    if(query === '') {
        alert('Write food name')
        return
    }

    resultsDiv.innerHTML = '<p>Loading...</p>'

    try {

        const response = await fetch(
            `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=5&api_key=${API_KEY}`
        )

        const data = await response.json()

        resultsDiv.innerHTML = ''

        if(!data.foods || data.foods.length === 0) {
            resultsDiv.innerHTML = '<p>No results</p>'
            return
        }

        data.foods.forEach(food => {

            const nutrients = food.foodNutrients || []

            const calories = getNutrient(nutrients, 'Energy')
            const protein = getNutrient(nutrients, 'Protein')
            const carbs = getNutrient(nutrients, 'Carbohydrate, by difference')
            const fat = getNutrient(nutrients, 'Total lipid (fat)')
            const fiber = getNutrient(nutrients, 'Fiber, total dietary')

            const div = document.createElement('div')
            div.className = 'result'

            div.innerHTML = `
                <b>${food.description}</b><br>
                Calories: ${calories} kcal / 100g<br>
                Protein: ${protein} g<br>
                Carbs: ${carbs} g<br>
                Fat: ${fat} g<br>
                Fiber: ${fiber} g<br>
                <button>Add</button>
            `

            div.querySelector('button').addEventListener('click', () => {
                addFood(food.description, calories, protein, carbs, fat, fiber)
            })

            resultsDiv.appendChild(div)

        })

    } catch(error) {
        console.error(error)
        resultsDiv.innerHTML = '<p>Error loading data</p>'
    }
}

searchButton.addEventListener('click', searchFood)