import {storage} from "./localStorageReading"
import {createTask, filteringTasks} from "./exportedFunction"

//Получение ссылок на поле ввода
const inputTodos = document.getElementById("Todo-List__Input")

//Слушатель нажатия кнопок в поле ввода
inputTodos.addEventListener("keypress", (e) => {

    //Создание задания для добавления в список по нажатию кнопки enter
    if(e.key === "Enter" && inputTodos.value !== null){

        //Проверка задачи на валидность
        if (inputTodos.value !== "" &&
            (((inputTodos.value.match(/\s/g) || []).length) !== inputTodos.value.length)){

            if (inputTodos.value.startsWith(' ')) inputTodos.value = inputTodos.value.trim()


            //Запись поля ввода в переменную и его очистка
            let taskText = inputTodos.value.toString()
            inputTodos.value = ""

            //Добавление задачи в локальное хранилище
            let taskJson = {
                title: taskText.toString(),
                completed: false,
                id: Date.now()
            }
            storage.push(taskJson)
            localStorage.setItem("todoList", JSON.stringify(storage))

            //Создание элемента задачи для добавления в список
            createTask(taskJson)
            filteringTasks()
        }
        else {
            inputTodos.value = ''
        }
    }

})
