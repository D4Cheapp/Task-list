import {Task} from './task';
import {filteringTasks} from "./filtersAndButtons";
import {refreshTaskCounter} from "./userInputReading";

//Переменная в которой будет записано локальное хранилище
export let storage = []

//Считывание локальной памяти
function storageReading(){
    //Если локальное хранилище пустое, то в нем создается пустой массив
    if (!localStorage.getItem('todoList')){
        localStorage.setItem('todoList','[]')
    }
    //Иначе из него считываются задачи
    else {
        storage = JSON.parse(localStorage.getItem('todoList'))
        for (let taskJson of storage){
            new Task(taskJson).createElement()
        }
        filteringTasks()
    }
}
storageReading()

//Функция удаления задачи
export function removeTaskInMemory(dataId){
    storage = storage.filter(element => element.id !== dataId)
    localStorage.setItem('todoList', JSON.stringify(storage))
    refreshTaskCounter()
}

