//Кнопки сортировки задач по состояниям
document.getElementById("All-Tasks").addEventListener
("click", ()=> {all(); refreshTaskCounter()});
document.getElementById("Completed-Tasks").addEventListener
("click", ()=> {completed(); refreshTaskCounter()});
document.getElementById("Active-Tasks").addEventListener
("click", ()=> {active(); refreshTaskCounter()});

//Кнопка очистки выполненых заданий
document.getElementById("ClearCompleted").addEventListener("click",clearComplete);

//Счетчик задач
const taskCountText = document.getElementById("Tasks-Counter");

//Очистка выполненных задач
function clearComplete(){
    //Удаление выполненных задач
    for (let i of document.getElementsByClassName("Completed")){
        i.remove();
    }
}

//Выполненные задачи
function completed(){
    for (let i of document.querySelectorAll(".Todo-List__Tasks__Task:not(.Completed)")){
        i.style.display = "none";
    }
    for (let i of document.getElementsByClassName("Todo-List__Tasks__Task Completed")){
        i.style.display = "block";
    }
}

//Активные задачи
function active(){
    for (let i of document.querySelectorAll(".Todo-List__Tasks__Task:not(.Completed)")){
        i.style.display = "block";
    }
    for (let i of document.getElementsByClassName("Todo-List__Tasks__Task Completed")){
        i.style.display = "none";
    }
}

//Все задачи
function all(){
    for (let i of document.getElementsByClassName("Todo-List__Tasks__Task")){
        i.style.display = "block";
    }
}

//Обновление счетчика
export function refreshTaskCounter(){
    taskCountText.innerHTML =
        document.getElementsByClassName("Todo-List__Tasks__Task").length  + " tasks left";
}