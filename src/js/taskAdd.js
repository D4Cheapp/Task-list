import {storage} from "./localStorageReading";
import {createTask, refreshTaskCounter} from "./exportedFunction";

//Получение ссылок на поле ввода и список задач
const inputTodos = document.getElementById("Todo-List__Input");
const taskContainer = document.getElementById("Todo-List__Tasks");

//Счетчик задач в списке
const taskCountText = document.getElementById("Tasks-Counter");
taskCountText.innerHTML = document.getElementsByClassName("Todo-List__Tasks__Task").length + " tasks left";

//Слушатель нажатия кнопок в поле ввода
inputTodos.addEventListener("keypress", (e) => {

    //Создание задания для добавления в список по нажатию кнопки enter
    if(e.key === "Enter" && inputTodos.value !== ""){

        //Запись поля ввода в переменную и его очистка
        let taskText = inputTodos.value.toString();
        inputTodos.value = "";

        //Создание элемента задачи для добавления в список
        let task = createTask(taskText,false,
            document.getElementsByClassName("Todo-List__Tasks__Task").length.toString());

        //Изменение счетчика задач и добавление задачи в список
        taskContainer.append(task);
        let taskJson = {
            title: taskText.toString(),
            completed: false,
            id: Date.now()
        }
        storage.push(taskJson);
        localStorage.setItem("todoList", JSON.stringify(storage));
        refreshTaskCounter();
    }
})
