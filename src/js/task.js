import {removeTaskInMemory, storage} from './localStorage'
import {filteringTasks} from "./filtersAndButtons";
import {refreshTaskCounter} from "./userInputReading";

let taskContainer = document.getElementById('Todo-List__Tasks')

export class Task{
    text = ''
    data_id = 0
    checked = false

    //Создание родительского div контейнера
    constructor(taskJson) {
        this.text = taskJson.title.toString()
        this.data_id = taskJson.id
        this.checked = taskJson.completed
    }

    //Функция создания задачи
    createElement(){
        //Создание родительского div контейнера
        let task = document.createElement('div')
        task.style.display = 'inline-flex'
        task.classList.add('Todo-List__Tasks__Task')
        task.setAttribute('data-id', this.data_id)

        //Кастомный чекбокс
        let customCheckBox = document.createElement('label')
        customCheckBox.classList.add('Todo-List__Tasks__Task__Custom-Checkbox')

        //Инпут чекбокса
        let completeInput = document.createElement('input')
        completeInput.classList.add('Todo-List__Tasks__Task__Toggle-Check')
        completeInput.type = 'checkBox'

        //Изменение состояния в локальной памяти
        completeInput.addEventListener('click', () => {
            task.classList.toggle('Completed')
            completeInput.setAttribute('check', 'check')
            for (let i = 0; i < storage.length; i++) {
                if (storage[i].id === this.data_id) {
                    storage[i].completed = !storage[i].completed
                    localStorage.setItem('todoList', JSON.stringify(storage))
                }
            }
            filteringTasks()
            refreshTaskCounter()
        })

        if (this.checked) {
            task.classList.add('Completed')
        }

        //Вставка инпута в лэйбл и лэйбла в контейнер
        customCheckBox.insertAdjacentElement('afterbegin', completeInput)
        task.insertAdjacentElement('afterbegin', customCheckBox)

        //Текст задачи
        let taskTitle = document.createElement('textarea')
        taskTitle.setAttribute('readonly','true')
        taskTitle.setAttribute('rows','1')
        taskTitle.classList.add('Todo-List__Tasks__Task__Task-Title')
        taskTitle.value = this.text.trim()

        //Кнопка удаления задачи
        let deleteInput = document.createElement('button')
        deleteInput.classList.add('Todo-List__Tasks__Task__Delete-Task')
        deleteInput.addEventListener('click', () => {
            task.remove()
            removeTaskInMemory(this.data_id)
        })

        task.insertAdjacentElement('beforeend', taskTitle)
        task.insertAdjacentElement('beforeend', deleteInput)

        task.addEventListener('dblclick',()=>{
            this.editTask(this.data_id, taskTitle,customCheckBox,deleteInput,task)
        })

        taskContainer.append(task)

        this.resizeTask(taskTitle,task)
        window.addEventListener('resize', ()=>this.resizeTask(taskTitle,task))

        refreshTaskCounter()
    }

    //Функция для изменения размера задачи в зависимости от количества текста
    resizeTask(text,task){
        text.style.height = 'auto'
        text.style.height = text.scrollHeight+'px'

        task.style.height = `calc(${text.scrollHeight+'px'} + 1.5vh`
    }

    //Редактирование задачи
    editTask(id,textContainer,checkbox,deleteButton,taskContainer){
        window.getSelection().removeAllRanges()
        textContainer.focus()
        textContainer.selectionStart = textContainer.value.length
        deleteButton.style.display = 'none'
        checkbox.style.display = 'none'

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
                        let taskText = ''
                        textContainer.value.toString().split(' ').map(i => i === '' ? '' : taskText += i + ' ')
                        textContainer.value = taskText.trim()
                        this.resizeTask(textContainer,taskContainer)
                        task.title = textContainer.value
                        localStorage.setItem('todoList', JSON.stringify(storage))
                        break
                    }
                }
            }

            taskContainer.classList.remove('Edited')
            textContainer.setAttribute('readonly','true')
            textContainer.classList.remove('Focus')

            deleteButton.removeAttribute('style')
            checkbox.removeAttribute('style')
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
}