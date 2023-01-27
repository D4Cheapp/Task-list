import {removeSeveralTasksInMemory, removeTaskInMemory, storage} from './localStorage';
import {refreshTaskCounter} from "./userInputReading";

//Кнопки фильтров задач
const allTasks = document.getElementById('All-Tasks')
const activeTasks = document.getElementById('Active-Tasks')
const completedTasks = document.getElementById('Completed-Tasks')

//Смена страницы
allTasks.addEventListener('click', () => urlReplace('#'))
activeTasks.addEventListener('click', () => urlReplace('#Active'))
completedTasks.addEventListener('click', () => urlReplace('#Completed'))

//Функция для смены url страницы
function urlReplace(filter){
    const link = document.URL.split('/')
    link[link.length-1] = filter
    window.location.href = link.join('/')
    filteringTasks()
}

//Кнопка очистки выполненных заданий
document.getElementById('Clear-Completed').addEventListener('click',clearComplete)

//Кнопка переключения всех состояний задач
document.getElementById('Toggle-State').addEventListener('click',findWitchState)

//Контейнер с задачами
const taskContainer = document.getElementById('Task-Section')

//Выбор для завершения или для начала задач
function findWitchState(){
    const completedTasks = document.querySelectorAll('div.Todo-List__Tasks__Task.Completed')
    const tasks = document.querySelectorAll('div.Todo-List__Tasks__Task')
    const isCompleted = completedTasks.length === storage.length
    toggleState(tasks, isCompleted)
}

//Переключение состояний задач
function toggleState(tasks, stateFromToggle){
    storage.forEach(index => index.completed = !stateFromToggle)
    tasks.forEach(task => stateFromToggle ? task.classList.remove('Completed') : task.classList.add('Completed'))
    localStorage.setItem('todoList', JSON.stringify(storage))
    refreshTaskCounter()
}

//Очистка выполненных задач
function clearComplete(){
    const completedTask = taskContainer.querySelectorAll('div.Completed')
    let completedTaskId = []
    for (let element of completedTask){
        element.remove()
        completedTaskId.push(+element.getAttribute('data-id'))
    }
    removeSeveralTasksInMemory(completedTaskId)
}

//Функция сортировки задач
export function filteringTasks(){
    let filter = []
    const allButtons = document.getElementsByClassName('Todo-List__Footer-Buttons__Link')
    for (let button of allButtons) {
        button.classList.remove('Active-Link')
    }

    const link = document.URL.split('/')
    const lastUrlComponent = link[link.length-1]

    switch (lastUrlComponent){
        case '#Active': filter = [false]; activeTasks.classList.add('Active-Link'); break;
        case '#Completed': filter = [true]; completedTasks.classList.add('Active-Link'); break;
        default: filter = [true,false]; allTasks.classList.add('Active-Link'); break;
    }

    const tasksToShow = taskContainer.querySelectorAll('div.Todo-List__Tasks__Task')
    for (let task of tasksToShow){
        let isShow = filter.includes(task.classList.contains('Completed'))
            task.style.display = isShow ? 'inline-flex' : 'none'
    }
}
