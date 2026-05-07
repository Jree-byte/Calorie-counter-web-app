import { items } from './storage.js'

const totalElement = document.querySelector('#total')
const averageElement = document.querySelector('#avg')
const maxElement = document.querySelector('#max')
const goalElement = document.querySelector('#goal')

const proteinElement = document.querySelector('#protein')
const carbsElement = document.querySelector('#carbs')
const fatElement = document.querySelector('#fat')
const fiberElement = document.querySelector('#fiber')

const renderStats = () => {

    if(!totalElement) return

    let totalCalories = 0
    let totalProtein = 0
    let totalCarbs = 0
    let totalFat = 0
    let totalFiber = 0

    let maxFood = null

    items.forEach(item => {

        totalCalories += item.calories || 0
        totalProtein += item.protein || 0
        totalCarbs += item.carbs || 0
        totalFat += item.fat || 0
        totalFiber += item.fiber || 0

        if(!maxFood || item.calories > maxFood.calories) {
            maxFood = item
        }

    })

    const averageCalories =
        items.length ? totalCalories / items.length : 0

    const calorieGoal = 2000

    totalElement.textContent =
        `Total calories: ${totalCalories.toFixed(0)} kcal`

    averageElement.textContent =
        `Average calories: ${averageCalories.toFixed(0)} kcal`

    maxElement.textContent =
        maxFood
            ? `Largest meal: ${maxFood.name}`
            : 'No data'

    goalElement.textContent =
        totalCalories > calorieGoal
            ? `Goal exceeded (${calorieGoal} kcal)`
            : `Remaining: ${(calorieGoal - totalCalories).toFixed(0)} kcal`

    proteinElement.textContent =
        `Protein: ${totalProtein.toFixed(1)} g`

    carbsElement.textContent =
        `Carbohydrates: ${totalCarbs.toFixed(1)} g`

    fatElement.textContent =
        `Fat: ${totalFat.toFixed(1)} g`

    fiberElement.textContent =
        `Fiber: ${totalFiber.toFixed(1)} g`
}

renderStats()