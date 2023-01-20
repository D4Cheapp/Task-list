import {removeTaskInMemory} from './localStorage';

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

//Контейнер с задачами
const taskContainer = document.getElementById('Task-Section')

//Очистка выполненных задач
function clearComplete(){
    const completedTask = taskContainer.querySelectorAll('div.Completed')

    for (let element of completedTask){
        element.remove()
        removeTaskInMemory(element.getAttribute('data-id'))
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
