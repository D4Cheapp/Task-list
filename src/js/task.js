import {removeTaskInMemory, storage} from './localStorage'
import {filteringTasks} from "./filtersAndButtons";
import {refreshTaskCounter} from "./userInputReading";

const taskContainer = document.getElementById('Task-Section')

export class Task{
    text = ''
    data_id = 0
    checked = false

    //Создание родительского div контейнера
    constructor(taskData) {
        this.text = taskData.title
        this.data_id = taskData.id
        this.checked = taskData.completed
    }

    //Функция создания задачи
    createElement(){
        //Конвертация строки в html element
        function stringToElement(htmlString){
            const element = document.createElement('div')
            element.innerHTML = htmlString
            return element.firstChild
        }

        //Создание родительского div контейнера
        const task = stringToElement(
        `<div class="Todo-List__Tasks__Task" style="display: inline-flex" data-id="${this.data_id}"></div>`)
        taskContainer.insertAdjacentElement('beforeend', task)

        //Проверка на выполненность
        if (this.checked) {
            task.classList.add('Completed')
        }

        //Кастомный чекбокс
        const customCheckbox = stringToElement(
        `<label class="Todo-List__Tasks__Task__Custom-Checkbox"></label>`)
        task.insertAdjacentElement('afterbegin', customCheckbox)

        //Инпут чекбокса
        const completeInput = stringToElement(
        `<input class="Todo-List__Tasks__Task__Toggle-Check" type="checkbox">`)
        customCheckbox.insertAdjacentElement('afterbegin', completeInput)

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

        //Текст задачи
        const taskTitle  = stringToElement(
`<textarea class="Todo-List__Tasks__Task__Task-Title" readonly="true" rows="1">
          </textarea>`)
        taskTitle.value = this.text.trim()
        task.insertAdjacentElement('beforeend', taskTitle)

        //Кнопка удаления задачи
        const deleteInput = stringToElement(
        `<button class="Todo-List__Tasks__Task__Delete-Task"></button>`)
        task.insertAdjacentElement('beforeend', deleteInput)

        deleteInput.addEventListener('click', () => {
            task.remove()
            removeTaskInMemory(this.data_id)
        })

        //Изменение задачи по двойному клику
        task.addEventListener('dblclick',()=>{
            this.editTask(taskTitle,customCheckbox,deleteInput,task)
        })

        //Изменение размера контейнера
        this.resizeTask(taskTitle,task)
        window.addEventListener('resize', ()=>this.resizeTask(taskTitle,task))

        //Изменение счетчика
        refreshTaskCounter()
    }

    //Функция для изменения размера задачи в зависимости от количества текста
    resizeTask(text,task){
        text.style.height = 'auto'
        text.style.height = text.scrollHeight+'px'

        task.style.height = `calc(${text.scrollHeight+'px'} + 1.5vh`
    }

    //Редактирование задачи
    editTask(textContainer,checkbox,deleteButton,taskContainer){
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