import {storage} from './localStorage'
import {Task} from './task';
import {filteringTasks} from "./filtersAndButtons";

//Получение ссылок на поле ввода
const inputTodos = document.getElementById('User-Input')

//Слушатель нажатия кнопок в поле ввода
inputTodos.addEventListener('keypress', (e) => {

    //Создание задания для добавления в список по нажатию кнопки enter
    if(e.key === 'Enter'){
        //Запись поля ввода в переменную и его очистка
        let taskText = ''
        const splitTask = inputTodos.value.toString().split(' ')
        for (let char of splitTask) {
            if (char !== '')
                taskText += char + ' '
        }
        taskText.trim()
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
    let count = document.getElementsByClassName('Completed').length
    document.getElementById('Tasks-Counter').innerHTML =
        count + ' tasks left'
}

