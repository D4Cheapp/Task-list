//Кнопки сортировки задач по состояниям
import {refreshTaskCounter, removeTask} from "./exportedFunction";

document.getElementById("All-Tasks").addEventListener
("click", ()=> {all(); refreshTaskCounter()});
document.getElementById("Completed-Tasks").addEventListener
("click", completed)
document.getElementById("Active-Tasks").addEventListener
("click", active);

//Кнопка очистки выполненых заданий
document.getElementById("ClearCompleted").addEventListener("click",clearComplete);

//Счетчик задач
const taskCountText = document.getElementById("Tasks-Counter");

//Контейнер с задачами
const taskContainer = document.getElementById("Todo-List__Tasks");

//Очистка выполненных задач
function clearComplete(){
    //Удаление выполненных задач
    for (let i of taskContainer.querySelectorAll(".Todo-List__Tasks__Task.Completed")){
        removeTask(i.getAttribute("data-id"))
        i.remove()
    }
    refreshTaskCounter()
}

//Выполненные задачи
function completed(){
    let count = 0
    for (let i of taskContainer.querySelectorAll(".Todo-List__Tasks__Task:not(.Completed)")){
        i.style.display = "none";
    }
    for (let i of taskContainer.getElementsByClassName("Todo-List__Tasks__Task Completed")){
        i.style.display = "block";
        count++;
    }
    refreshTaskCounter(count)
}

//Активные задачи
function active(){
    let count = 0
    for (let i of taskContainer.querySelectorAll(".Todo-List__Tasks__Task:not(.Completed)")){
        i.style.display = "block";
        count++;
    }
    for (let i of taskContainer.getElementsByClassName("Todo-List__Tasks__Task Completed")){
        i.style.display = "none";
    }
    refreshTaskCounter(count)
}

//Все задачи
function all(){
    for (let i of taskContainer.getElementsByClassName("Todo-List__Tasks__Task")){
        i.style.display = "block";
    }
}
