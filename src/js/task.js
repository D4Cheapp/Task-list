import {removeTaskInMemory, storage} from './localStorage'
import {filteringTasks} from "./filtersAndButtons";
import {refreshTaskCounter} from "./userInputReading";

const taskContainer = document.getElementById('Task-Section')

export class Task{
    text = ''
    data_id = 0
    checked = false

    taskComponents = {
        task: '',
        customCheckbox: '',
        completeInput: '',
        deleteInput: '',
        taskTitle: '',
    }

    constructor(taskData) {
        this.text = taskData.title
        this.data_id = taskData.id
        this.checked = taskData.completed
    }

    //Функция создания задачи
    createElement(){
        //Создание html структуры задачи
        const taskHTML = `
            <div class="Todo-List__Tasks__Task" style="display: inline-flex" data-id="${this.data_id}">
                <label class="Todo-List__Tasks__Task__Custom-Checkbox">
                    <input class="Todo-List__Tasks__Task__Toggle-Check" type="checkbox">
                </label>
                <textarea class="Todo-List__Tasks__Task__Task-Title" readonly="true" rows="1">
                </textarea>
                <button class="Todo-List__Tasks__Task__Delete-Task"></button>
            </div>`

        taskContainer.insertAdjacentHTML('beforeend', taskHTML)

        //Получение добавленной задачи
        this.taskComponents.task = taskContainer.querySelector(
            `div.Todo-List__Tasks__Task[data-id='${this.data_id}']`)

        //Получение чекбокса
        this.taskComponents.customCheckbox = this.taskComponents.task.querySelector(
            'label.Todo-List__Tasks__Task__Custom-Checkbox')

        //Получение инпута чекбокса
        this.taskComponents.completeInput = this.taskComponents.task.querySelector(
            'input.Todo-List__Tasks__Task__Toggle-Check')

        //Получение кнопки удаления
        this.taskComponents.deleteInput = this.taskComponents.task.querySelector(
            'button.Todo-List__Tasks__Task__Delete-Task')

        //Получение текста задачи
        this.taskComponents.taskTitle = this.taskComponents.task.querySelector(
            'textarea.Todo-List__Tasks__Task__Task-Title')
        this.taskComponents.taskTitle.value = this.text

        //Проверка на выполненность
        if (this.checked) {
            this.taskComponents.task.classList.add('Completed')
        }

        //Изменение состояния в локальной памяти
        this.taskComponents.completeInput.addEventListener('click', () => {
            this.taskComponents.task.classList.toggle('Completed')
            this.taskComponents.completeInput.setAttribute('check', 'check')
            for (let i = 0; i < storage.length; i++) {
                if (storage[i].id === this.data_id) {
                    storage[i].completed = !storage[i].completed
                    localStorage.setItem('todoList', JSON.stringify(storage))
                }
            }
            filteringTasks()
            refreshTaskCounter()
        })

        //Кнопка удаления задачи
        this.taskComponents.deleteInput.addEventListener('click', () => {
            this.taskComponents.task.remove()
            removeTaskInMemory(this.data_id)
        })

        //Изменение задачи по двойному клику
        this.taskComponents.task.addEventListener('dblclick',()=>{
            this.editTask()
        })

        //Изменение размера контейнера
        this.resizeTask()
        window.addEventListener('resize', () => this.resizeTask())

        //Изменение счетчика
        refreshTaskCounter()
    }

    //Функция для изменения размера задачи в зависимости от количества текста
    resizeTask(){
        const task = this.taskComponents.task
        const text = this.taskComponents.taskTitle

        text.style.height = 'auto'
        text.style.height = text.scrollHeight+'px'

        task.style.height = `calc(${text.scrollHeight+'px'} + 1.5vh`
    }

    //Редактирование задачи
    editTask(){
        const taskContainer = this.taskComponents.task
        const textContainer = this.taskComponents.taskTitle
        const deleteButton = this.taskComponents.customCheckbox
        const checkbox = this.taskComponents.deleteInput

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
                if (task.id === this.data_id){
                    if (!textContainer.value.trim()){
                        deleteButton.click()
                        break
                    }

                    let taskText = ''
                    const splitText = textContainer.value.toString().split(' ')
                    for (let char of splitText) {
                        if (char !== '')
                            taskText += char + ' '
                    }
                    textContainer.value = taskText.trim()
                    this.resizeTask(textContainer,taskContainer)
                    task.title = textContainer.value
                    localStorage.setItem('todoList', JSON.stringify(storage))
                    break
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