const items = JSON.parse(localStorage.getItem('items')) || []

const saveItems = () => {
    localStorage.setItem('items', JSON.stringify(items))
}

export { items, saveItems }