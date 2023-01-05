import {storage} from "./localStorageReading";

let taskContainer = document.getElementById("Todo-List__Tasks");

//Обновление счетчика задач
export function refreshTaskCounter(){
    document.getElementById("Tasks-Counter").innerHTML =
        document.querySelectorAll(".Todo-List__Tasks__Task").length
        + " tasks left";
}


//Функция сортировки задач
export function filteringTasks(){
    taskContainer.innerHTML = ""
    let filter = [];
    for (let i of document.getElementsByClassName("Todo-List__Footer-Buttons__Link")) {
        i.classList.remove("Active-Link");
    }
    switch (window.location.hash){
        case "": filter = [true,false]; document.getElementById("All-Tasks").classList.add("Active-Link"); break;
        case "#/Active": filter = [false]; document.getElementById("Active-Tasks").classList.add("Active-Link"); break;
        case "#/Completed": filter = [true]; document.getElementById("Completed-Tasks").classList.add("Active-Link"); break;
    }
    for (let i of storage){
        if (filter.includes(i.completed))
            createTask(i)
    }
    refreshTaskCounter()
}


//Функция удаления задачи
export function removeTaskInMemory(dataId){
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].id === +dataId){
            storage.splice(i,1)
            localStorage.setItem("todoList", JSON.stringify(storage));
            refreshTaskCounter()
            break;
        }
    }
}


//Функция создания задачи
export function createTask(element) {
    //Создание родительского div контейнера
    let task = document.createElement("label");
    task.classList.add("Todo-List__Tasks__Task");
    task.setAttribute("data-id", element.id);

    //Текст задачи
    let taskTitle = document.createElement("p");
    taskTitle.innerHTML = element.title;
    taskTitle.classList.add("Todo-List__Tasks__Task__Task-Title");
    task.insertAdjacentElement("afterbegin", taskTitle);

    //Кастомный чекбокс
    let customCheckBox = document.createElement("div");
    customCheckBox.setAttribute("for","check")
    customCheckBox.classList.add("Todo-List__Tasks__Task__Custom-Checkbox")
    task.insertAdjacentElement("afterbegin", customCheckBox);

    //Кнопка завершения задачи
    let completeInput = document.createElement("input");
    completeInput.classList.add("Todo-List__Tasks__Task__Toggle-Check");
    completeInput.type = "checkBox";

    completeInput.addEventListener("click", () => {
        task.classList.toggle("Completed");
        for (let i = 0; i < storage.length; i++) {
            if (storage[i].id === element.id) {
                storage[i].completed = !storage[i].completed;
                localStorage.setItem("todoList", JSON.stringify(storage));
            }
        }
    });

    if (element.completed) {
        task.classList.add("Completed");
        completeInput.setAttribute("checked", "checked");
    }
    task.insertAdjacentElement("afterbegin", completeInput);

    //Кнопка удаления задачи
    let deleteInput = document.createElement("button");
    deleteInput.classList.add("Todo-List__Tasks__Task__Delete-Task");
    deleteInput.addEventListener("click", () => {
        task.remove();
        removeTaskInMemory(element.id);
    })
    task.insertAdjacentElement("beforeend", deleteInput);

    taskContainer.append(task);
    refreshTaskCounter();
}
