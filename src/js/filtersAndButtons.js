import {filteringTasks, removeTaskInMemory} from "./exportedFunction"

//Смена страницы
document.getElementById('All-Tasks').addEventListener('click',
    ()=>{history.pushState(null,null,'/Todo-list/#');filteringTasks()})
document.getElementById('Active-Tasks').addEventListener('click',
    ()=>{history.pushState(null,null,'/Todo-list/#/Active');filteringTasks()})
document.getElementById('Completed-Tasks').addEventListener('click',
    ()=>{history.pushState(null,null,'/Todo-list/#/Completed');filteringTasks()})

//Кнопка очистки выполненых заданий
document.getElementById("ClearCompleted").addEventListener("click",clearComplete)

//Контейнер с задачами
const taskContainer = document.getElementById("Todo-List__Tasks")

//Очистка выполненных задач
function clearComplete(){
    for (let i of taskContainer.querySelectorAll(".Completed")){
        i.remove()
        removeTaskInMemory(i.getAttribute("data-id"))
    }
}

