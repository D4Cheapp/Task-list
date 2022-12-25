import {refreshTaskCounter} from "./buttons";

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
        let task = createTask(taskText);

        //Изменение счетчика задач и добавление задачи в список
        taskContainer.append(task);
        refreshTaskCounter();
    }
})
//Функция создания задачи
function createTask(taskText){
    //Создание родительского div контейнера
    let task = document.createElement("div");
    task.classList.add("Todo-List__Tasks__Task");
    task.setAttribute("data-id",
        document.getElementsByClassName("Todo-List__Tasks__Task").length.toString());

    //Текст задачи
    let label = document.createElement("label");
    label.innerHTML = taskText;
    label.classList.add("Todo-List__Tasks__Task__Label");
    task.insertAdjacentElement("afterbegin",label);

    //Кнопка завершения задачи
    let completeInput = document.createElement("input");
    completeInput.classList.add("Todo-List__Tasks__Task__Toggle-Check");
    completeInput.type = "checkBox";
    completeInput.addEventListener("click", () => task.classList.toggle("Completed"));
    task.insertAdjacentElement("afterbegin",completeInput);

    //Кнопка удаления задачи
    let deleteInput = document.createElement("button");
    deleteInput.classList.add("Todo-List__Tasks__Task__Delete-Task");
    deleteInput.addEventListener("click", () => {task.remove(); refreshTaskCounter()})
    task.insertAdjacentElement("beforeend", deleteInput);

    return task
}