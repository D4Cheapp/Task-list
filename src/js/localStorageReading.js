//Контейнер с задачами
import {createTask} from "./exportedFunction";

const taskContainer = document.getElementById("Todo-List__Tasks");

export let storage = []

if (localStorage.todoList === undefined){
    localStorage.setItem("todoList",JSON.stringify([]))
}
else {
    storage = JSON.parse(localStorage.getItem("todoList"))
    for (let i of storage){
        let task = createTask(i.title,i.completed, i.id);
        taskContainer.append(task);
    }
}

