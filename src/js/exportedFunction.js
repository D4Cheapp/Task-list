import {storage} from "./localStorageReading"

let taskContainer = document.getElementById("Todo-List__Tasks")

//Обновление счетчика задач
export function refreshTaskCounter(){
    let count = 0

    for (let i of storage){
        if (!i.completed) count ++
    }

    document.getElementById("Tasks-Counter").innerHTML =
        count + " tasks left"
}

//Функция сортировки задач
export function filteringTasks(){
    let filter = []
    for (let i of document.getElementsByClassName("Todo-List__Footer-Buttons__Link")) {
        i.classList.remove("Active-Link")
    }

    let link = document.URL.split('/')
    switch (link[link.length-1]){
        case "#": filter = [true,false]; document.getElementById("All-Tasks").classList.add("Active-Link"); break;
        case "Active": filter = [false]; document.getElementById("Active-Tasks").classList.add("Active-Link"); break;
        case "Completed": filter = [true]; document.getElementById("Completed-Tasks").classList.add("Active-Link"); break;
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


//Функция удаления задачи
export function removeTaskInMemory(dataId){
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].id === +dataId){
            storage.splice(i,1)
            localStorage.setItem("todoList", JSON.stringify(storage))
            refreshTaskCounter()
            break
        }
    }
}


//Функция создания задачи
export function createTask(element) {
    //Создание родительского div контейнера
    let task = document.createElement("div")
    task.style.display = 'inline-flex'
    task.classList.add("Todo-List__Tasks__Task")
    task.setAttribute("data-id", element.id)

    //Кастомный чекбокс
    let customCheckBox = document.createElement("label")
    customCheckBox.classList.add("Todo-List__Tasks__Task__Custom-Checkbox")

        //Инпут чекбокса
        let completeInput = document.createElement("input")
        completeInput.classList.add("Todo-List__Tasks__Task__Toggle-Check")
        completeInput.type = "checkBox"

        //Изменение состояния в локальной памяти
        completeInput.addEventListener("click", () => {
            task.classList.toggle("Completed")
            completeInput.setAttribute('check', 'check')
            for (let i = 0; i < storage.length; i++) {
                if (storage[i].id === element.id) {
                    storage[i].completed = !storage[i].completed
                    localStorage.setItem("todoList", JSON.stringify(storage))
                }
            }
            filteringTasks()
            refreshTaskCounter()
        })

        if (element.completed) {
            task.classList.add("Completed")
        }

    //Вставка инпута в лэйбл и лэйбла в контейнер
    customCheckBox.insertAdjacentElement("afterbegin", completeInput)
    task.insertAdjacentElement("afterbegin", customCheckBox)

    //Кнопка удаления задачи
    let deleteInput = document.createElement("button")
    deleteInput.classList.add("Todo-List__Tasks__Task__Delete-Task")
    deleteInput.addEventListener("click", () => {
        task.remove()
        removeTaskInMemory(element.id)
    })


    //Текст задачи
    let taskTitle = document.createElement("textarea")

    taskTitle.setAttribute('readonly','true')
    taskTitle.classList.add("Todo-List__Tasks__Task__Task-Title")
    taskTitle.addEventListener('dblclick',()=>{
        editTask(element.id, taskTitle,deleteInput,task)
    })
    taskTitle.value = element.title

    task.insertAdjacentElement("beforeend", taskTitle)
    task.insertAdjacentElement("beforeend", deleteInput)

    taskContainer.append(task)

    resizeTask(taskTitle,task)
    window.addEventListener('resize', ()=>resizeTask(taskTitle,task))
    refreshTaskCounter()
}

//Редактирование задачи
function editTask(id,textContainer,deleteButton,taskContainer){
    window.getSelection().removeAllRanges()
    textContainer.selectionStart = textContainer.value.length
    deleteButton.style.opacity = '0'

    taskContainer.classList.add('Edited')
    textContainer.removeAttribute('readonly')
    textContainer.classList.add('Focus')

    const disableFocus = (event,func) => {
        for (let task of storage) {
            if (task.id === id){
                if (textContainer.value === '' ||
                    textContainer.value.length === (textContainer.value.match(/\s/g) || []).length){
                    deleteButton.click()
                    break
                }
                else {
                    if (textContainer.value.startsWith(' ')) textContainer.value = textContainer.value.trim()
                    resizeTask(textContainer,taskContainer)
                    task.title = textContainer.value
                    localStorage.setItem("todoList", JSON.stringify(storage))
                    break
                }
            }
        }

        taskContainer.classList.remove('Edited')
        textContainer.setAttribute('readonly','true')
        textContainer.classList.remove('Focus')

        deleteButton.removeAttribute('style')
        textContainer.removeEventListener(event, func)
    }
    textContainer.addEventListener('focusout', ()=>{disableFocus('focusout', disableFocus)})

    const enterCheck = (e)=>{
        if (e.key === 'Enter'){
            disableFocus('keypress', enterCheck)
        }
    }
    textContainer.addEventListener('keypress', enterCheck)
}

//Функция для изменения размера задачи в зависимости от количества текста
function resizeTask(text,task){
    if (text.scrollHeight > getComputedStyle(task).fontSize.split('px')[0]*2){
        task.style.height = text.scrollHeight+'px'

        text.style.height = 'auto'
        text.style.height = text.scrollHeight+'px'
    }else {
        text.style.height = '1em'
    }

}