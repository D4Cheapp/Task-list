import {removeTaskInMemory} from './localStorage';

//Смена страницы
document.getElementById('All-Tasks').addEventListener('click', ()=>{urlReplace('#')})
document.getElementById('Active-Tasks').addEventListener('click',()=>{urlReplace('#Active')})
document.getElementById('Completed-Tasks').addEventListener('click',()=>{urlReplace('#Completed')})

//Функция для смены url страницы
function urlReplace(filter){
    let link = document.URL.split('/');
    link[link.length-1] = filter;
    window.location.href = link.join('/') ;
    filteringTasks()
}

//Кнопка очистки выполненных заданий
document.getElementById('ClearCompleted').addEventListener('click',clearComplete)

//Контейнер с задачами
const taskContainer = document.getElementById('Todo-List__Tasks')

//Очистка выполненных задач
function clearComplete(){
    for (let i of taskContainer.querySelectorAll('.Completed')){
        i.remove()
        removeTaskInMemory(i.getAttribute('data-id'))
    }
}

//Функция сортировки задач
export function filteringTasks(){
    let filter = []
    for (let i of document.getElementsByClassName('Todo-List__Footer-Buttons__Link')) {
        i.classList.remove('Active-Link')
    }

    let link = document.URL.split('/')
    switch (link[link.length-1]){
        case '#Active': filter = [false]; document.getElementById('Active-Tasks').classList.add('Active-Link'); break;
        case '#Completed': filter = [true]; document.getElementById('Completed-Tasks').classList.add('Active-Link'); break;
        default: filter = [true,false]; document.getElementById('All-Tasks').classList.add('Active-Link'); break;
    }

    let tasksToShow = taskContainer.querySelectorAll('div.Todo-List__Tasks__Task')
    for (let task of tasksToShow){
        if (filter.includes(task.classList.contains('Completed'))){
            task.style.display = 'inline-flex'
        }
        else{
            task.style.display = 'none'
        }
    }
}
