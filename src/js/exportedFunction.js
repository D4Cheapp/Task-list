import {storage} from "./localStorageReading";

//Счетчик задач
const taskCountText = document.getElementById("Tasks-Counter");

//Контейнер с задачами
const taskContainer = document.getElementById("Todo-List__Tasks");

//Обновление счетчика
export function refreshTaskCounter(count){
    if (count === undefined)
        taskCountText.innerHTML =
            taskContainer.getElementsByClassName("Todo-List__Tasks__Task").length+ " tasks left";
    else{
        taskCountText.innerHTML = count  + " tasks left";
    }

}

//Функция удаления задачи
export function removeTask(dataId){
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].id === +dataId) {
            storage.splice(i, 1)
            localStorage.setItem("todoList", JSON.stringify(storage))
        }
    }
    refreshTaskCounter();
}

//Функция создания задачи
export function createTask(taskText, completed, dataId) {
    //Создание родительского div контейнера
    let task = document.createElement("div");
    task.classList.add("Todo-List__Tasks__Task");
    task.setAttribute("data-id", dataId);

    //Текст задачи
    let label = document.createElement("label");
    label.innerHTML = taskText;
    label.classList.add("Todo-List__Tasks__Task__Label");
    task.insertAdjacentElement("afterbegin", label);

    //Кнопка завершения задачи
    let completeInput = document.createElement("input");
    completeInput.classList.add("Todo-List__Tasks__Task__Toggle-Check");
    completeInput.type = "checkBox";

    completeInput.addEventListener("click", () => {
        task.classList.toggle("Completed");
        for (let i = 0; i < storage.length; i++) {
            if (storage[i].id === dataId) {
                storage[i] = {title: taskText, completed: !storage[i].completed, id: dataId}
                localStorage.setItem("todoList", JSON.stringify(storage))
            }
        }
    });

    if (completed) {
        task.classList.add("Completed")
        completeInput.setAttribute("checked", "checked")
    }
    task.insertAdjacentElement("afterbegin", completeInput);

    //Кнопка удаления задачи
    let deleteInput = document.createElement("button");
    deleteInput.classList.add("Todo-List__Tasks__Task__Delete-Task");
    deleteInput.addEventListener("click", () => {
        task.remove();
        removeTask(dataId);
    })
    task.insertAdjacentElement("beforeend", deleteInput);

    return task
}