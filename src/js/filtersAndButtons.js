import {removeTaskInMemory, storage} from './localStorage';
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
    const completedTasks = document.querySelectorAll('.Todo-List__Tasks__Task.Completed')
    const uncompletedTasks = document.querySelectorAll('.Todo-List__Tasks__Task:not(.Completed)')
    if (completedTasks.length === storage.length){
        toggleState(completedTasks, false)
    }
    else{
        toggleState(uncompletedTasks, true)
    }
}
//Переключение состояний задач
function toggleState(tasks, stateToToggle){
    for (let index in storage) {
        storage[index].completed = stateToToggle
    }
    for (let element of tasks){
        !stateToToggle ? element.classList.remove('Completed') : element.classList.add('Completed')
    }
    localStorage.setItem('todoList', JSON.stringify(storage))
    refreshTaskCounter()
}

//Очистка выполненных задач
function clearComplete(){
    const completedTask = taskContainer.querySelectorAll('div.Completed')

    for (let element of completedTask){
        element.remove()
        removeTaskInMemory(+element.getAttribute('data-id'))
    }
}

//Функция сортировки задач
export function filteringTasks(){
    let filter = []
    for (let i of document.getElementsByClassName('Todo-List__Footer-Buttons__Link')) {
        i.classList.remove('Active-Link')
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
        if (filter.includes(task.classList.contains('Completed'))){
            task.style.display = 'inline-flex'
        }
        else{
            task.style.display = 'none'
        }
    }
}
