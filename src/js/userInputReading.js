import {storage} from './localStorage'
import {Task} from './task';
import {filteringTasks} from "./filtersAndButtons";

//Получение ссылок на поле ввода
const inputTodos = document.getElementById('User-Input')

//Слушатель нажатия кнопок в поле ввода
inputTodos.addEventListener('keypress', (e) => {

    //Создание задания для добавления в список по нажатию кнопки enter
    if(e.key === 'Enter' && !!inputTodos.value.trim()){

        //Запись поля ввода в переменную и его очистка
        let taskText = inputTodos.value.replace(/\s+/gm,' ').trim()
        inputTodos.value = ''

        //Добавление задачи в локальное хранилище
        const taskData = {
            title: taskText,
            completed: false,
            id: Date.now()
        }
        storage.push(taskData)
        localStorage.setItem('todoList', JSON.stringify(storage))

        //Создание элемента задачи для добавления в список
        new Task(taskData).createElement()
        filteringTasks()
    }

    //Верификация ввода
    if (!inputTodos.value.trim()){
        inputTodos.value = ''
    }

})

//Обновление счетчика задач
export function refreshTaskCounter(){
    let count = document.querySelectorAll('.Todo-List__Tasks__Task:not(.Completed)').length
    document.getElementById('Tasks-Counter').innerHTML =
        count + ' tasks left'
}

