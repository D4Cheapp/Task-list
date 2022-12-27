import {filteringTasks, removeTaskInMemory} from "./exportedFunction";

//Сортировка задач при загрузке страницы
filteringTasks();

//Слушатель для фильтров задач при смене страниц
window.addEventListener("hashchange", filteringTasks)

//Кнопка очистки выполненых заданий
document.getElementById("ClearCompleted").addEventListener("click",clearComplete);

//Контейнер с задачами
const taskContainer = document.getElementById("Todo-List__Tasks");

//Очистка выполненных задач
function clearComplete(){
    for (let i of taskContainer.querySelectorAll(".Completed")){
        i.remove();
        removeTaskInMemory(i.getAttribute("data-id"));
    }
}

