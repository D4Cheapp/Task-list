import {storage} from './localStorage'
import {Task} from './task';
import {filteringTasks} from "./filtersAndButtons";

//Получение ссылок на поле ввода
const inputTodos = document.getElementById('Todo-List__Input')

//Слушатель нажатия кнопок в поле ввода
inputTodos.addEventListener('keypress', (e) => {

    //Создание задания для добавления в список по нажатию кнопки enter
    if(e.key === 'Enter' && inputTodos.value !== null){

        //Проверка задачи на валидность
        if (inputTodos.value !== '' &&
            (((inputTodos.value.match(/\s/g) || []).length) !== inputTodos.value.length)){

            //Запись поля ввода в переменную и его очистка
            let taskText = ''
            inputTodos.value.toString().split(' ').map(i => i === '' ? '' : taskText += i + ' ')
            taskText.trim()
            inputTodos.value = ''

            //Добавление задачи в локальное хранилище
            let taskJson = {
                title: taskText.toString(),
                completed: false,
                id: Date.now()
            }
            storage.push(taskJson)
            localStorage.setItem('todoList', JSON.stringify(storage))

            //Создание элемента задачи для добавления в список
            new Task(taskJson).createElement()
            filteringTasks()
        }
        else {
            inputTodos.value = ''
        }
    }

})


//Обновление счетчика задач
export function refreshTaskCounter(){
    let count = 0

    for (let i of storage){
        if (!i.completed) count ++
    }

    document.getElementById('Tasks-Counter').innerHTML =
        count + ' tasks left'
}

