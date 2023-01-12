import {createTask, filteringTasks} from "./exportedFunction"

//Переменная в которой будет записано локальное хранилище
export let storage = []

//Если локальное хранилище пустое, то в нем создается пустой массив
if (localStorage.todoList === undefined){
    localStorage.setItem("todoList","[]")
}
//Иначе из него считываются задачи
else {
    storage = JSON.parse(localStorage.getItem("todoList"))
    for (let i of storage){
        createTask(i)
    }
    filteringTasks()
}