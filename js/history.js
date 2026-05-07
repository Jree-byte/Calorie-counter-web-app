import { items, saveItems } from './storage.js'

const list = document.querySelector('#list')

const removeItem = (index) => {

    items.splice(index, 1)

    saveItems()

    renderHistory()
}

const renderHistory = () => {

    if(!list) return

    list.innerHTML = ''

    items.forEach((item, index) => {

        const li = document.createElement('li')

        li.innerHTML = `
            <div>
                <b>${item.name}</b> (${item.amount}g)<br>
                Calories: ${item.calories.toFixed(0)} kcal |
                Protein: ${item.protein.toFixed(1)} g |
                Carbohydrates: ${item.carbs.toFixed(1)} g |
                Fat: ${item.fat.toFixed(1)} g |
                Fiber: ${item.fiber.toFixed(1)} g
            </div>

            <button>X</button>
        `

        const button = li.querySelector('button')

        button.addEventListener('click', () => {
            removeItem(index)
        })

        list.appendChild(li)

    })
}

renderHistory()