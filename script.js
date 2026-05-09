const addTaskBtn = document.getElementById('addTaskBtn')
const cardcontainer = document.getElementById("cardcontainer")

async function getData() {
    const response = await fetch("http://localhost:3000/todos")
    const data = await response.json()
    return data
}

document.addEventListener("DOMContentLoaded", async () => {
    const taskData = await getData()
    taskData.forEach(element => {

        const {completed, id, title, userid} = element
        const card = document.createElement("div")
        card.innerHTML = `<div>
            <h1>Completed: ${completed}</h1>
            <span>ID: ${id}</span>
            <span>${title}</span>
        </div>`
        cardcontainer.appendChild(card)
    })


})